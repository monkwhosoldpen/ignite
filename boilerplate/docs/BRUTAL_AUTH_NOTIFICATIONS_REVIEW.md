# Brutal Auth & Notifications System Review

**Focus:** Cross-platform (Native + Web) architecture
**Verdict:** Functional scaffolding with significant production gaps

---

## EXECUTIVE SUMMARY

You have the skeleton of a notifications system, not a production system. The auth integration is coupling-heavy, the web implementation has security concerns, and the error handling is "log and pray" throughout. This will work for a demo. It will cause support tickets in production.

**Score: 5/10** - Needs significant hardening before production.

---

## ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────────────────┐
│                        App.tsx                               │
│  ┌─────────────┐    ┌──────────────────────┐                │
│  │ AuthProvider │ -> │ NotificationProvider │                │
│  └─────────────┘    └──────────────────────┘                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              services/notifications/index.ts                 │
│  ┌─────────────────────┐  ┌─────────────────────┐          │
│  │      native.ts       │  │       web.ts        │          │
│  │ @react-native-firebase│  │   Firebase JS SDK   │          │
│  └─────────────────────┘  └─────────────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

---

## AUTHENTICATION CONTEXT: THE GOOD, BAD, AND UGLY

### What Works
- Supabase integration is straightforward
- `onAuthStateChange` listener properly handles session updates
- Subscription cleanup in useEffect

### Critical Issues

#### 1. Race Condition on Logout
```typescript
const logout = useCallback(async () => {
  await supabase.auth.signOut()
  setSession(null)  // Redundant - onAuthStateChange will fire
  setUser(null)     // Redundant - onAuthStateChange will fire
  setAuthEmail("")
}, [])
```

You're setting state manually AND via the listener. If `onAuthStateChange` fires before your manual `setSession(null)`, you get a double render. If it fires after, you've already cleared state so it's a no-op. Pick one approach.

#### 2. No Token Refresh Handling
Supabase tokens expire. When they do, your auth state listener fires with `TOKEN_REFRESHED` event. You're not distinguishing this from other events. Fine for now, problematic when you need to:
- Retry failed API calls after refresh
- Update stored tokens
- Handle refresh failures

#### 3. Email Validation is Client-Side Only
```typescript
const validationError = useMemo(() => {
  if (!authEmail || authEmail.length === 0) return "can't be blank"
  if (authEmail.length < 6) return "must be at least 6 characters"
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authEmail)) return "must be a valid email address"
  return ""
}, [authEmail])
```

This regex allows `a@b.c` as valid. An attacker can bypass this entirely. Validation MUST happen server-side. This is UX sugar, not security.

#### 4. No Password Validation
You validate email but not password. No length requirements, no complexity check, nothing prevents users from using "123456".

#### 5. No Rate Limiting Awareness
If Supabase rate-limits your auth requests, you return a generic error. Users will hammer the button thinking it's broken.

#### 6. Session Persistence Mystery
Where does Supabase store the session? `@supabase/supabase-js` uses `localStorage` on web and AsyncStorage on native. But you're also using MMKV elsewhere. Inconsistent storage backends = debugging nightmares.

---

## NOTIFICATIONS CONTEXT: THE REAL PROBLEMS

### Architecture Issues

#### 1. Circular Dependency Risk
```typescript
// NotificationContext.tsx
import { useAuth } from "./AuthContext"

// Effect that depends on auth state
useEffect(() => {
  if (isAuthenticated && user && pushToken) {
    registerTokenWithBackend(pushToken)
  }
}, [isAuthenticated, user, pushToken, registerTokenWithBackend])
```

NotificationProvider depends on AuthProvider. If you ever need auth to depend on notifications (e.g., "show login prompt when notification tapped"), you have a circular dependency.

#### 2. Token Registration on Every Foreground
```typescript
const handleAppStateChange = (nextAppState: AppStateStatus) => {
  if (
    appState.current.match(/inactive|background/) &&
    nextAppState === "active" &&
    isAuthenticated && user && pushToken
  ) {
    registerTokenWithBackend(pushToken)  // EVERY. SINGLE. TIME.
  }
}
```

Every time the user opens the app, you're hitting Supabase to upsert the same token. On a chat app with frequent backgrounding, this is thousands of unnecessary API calls per user per day.

**Fix:** Track last registration timestamp in MMKV. Only re-register if token changed or >24 hours elapsed.

#### 3. No Retry Logic
```typescript
const { error: upsertError } = await supabase.from("push_tokens").upsert(...)

if (upsertError) {
  console.error("Failed to register push token:", upsertError)
  setError("Failed to register for notifications")
}
```

Network fails? Too bad. Token never gets registered. User never gets notifications. You log an error they'll never see.

#### 4. No Token Validation
You accept any token from `getPushToken()` and store it. But FCM tokens can be:
- Expired
- Revoked
- Associated with a different app
- Malformed

You should validate tokens server-side before storing.

#### 5. Stale Token Cleanup is Missing
When a user logs out:
```typescript
const unregisterTokenFromBackend = useCallback(async () => {
  if (!user || !pushToken) return  // Early return if no user
  await supabase.from("push_tokens").delete().eq("user_id", user.id)
}, [user, pushToken])
```

But `user` is already null when this runs (because logout clears it). This delete never executes. Stale tokens accumulate in your database.

#### 6. Multi-Device Not Considered
Your upsert uses `onConflict: "user_id,platform"`. User has iPhone + iPad, both iOS. Second device overwrites first device's token. First device stops receiving notifications.

---

## WEB NOTIFICATIONS: SECURITY CONCERNS

### The Service Worker Problem

```javascript
// public/firebase-messaging-sw.js
const firebaseConfig = {
  apiKey: "AIzaSyDr9iF87shHnvCOIsVT45_ABI_cBmpZ_BA",  // HARDCODED
  authDomain: "beta-95455.firebaseapp.com",
  projectId: "beta-95455",
  // ... more hardcoded values
}
```

#### Issue 1: Hardcoded Credentials in Static File
This service worker is a static file served from `/public`. It can't read environment variables. But you're also storing these same values in `config.base.ts` via `process.env`. Now you have two sources of truth that can drift.

If someone changes the env vars but forgets the service worker, web notifications break silently.

#### Issue 2: Service Worker Caching
Once registered, service workers are aggressively cached. If you deploy a fix to `firebase-messaging-sw.js`, users might not get it for 24+ hours. Your `registerServiceWorker` function has no versioning strategy.

#### Issue 3: No VAPID Key Rotation
```typescript
export async function getFCMToken(vapidKey: string): Promise<PushToken | null> {
```

VAPID keys can be compromised. When you rotate them, every web user's token becomes invalid. You have no migration strategy.

### Web Implementation Gaps

#### 1. No Permission Pre-Prompt
```typescript
export async function requestPermissions(): Promise<boolean> {
  const permission = await Notification.requestPermission()
  return permission === "granted"
}
```

You fire the browser permission prompt immediately. If user denies, you can NEVER ask again (browser restriction). World-class apps show a custom pre-prompt explaining why, then only trigger the real prompt if user agrees.

#### 2. "denied" vs "default" Not Handled
```typescript
if (!("Notification" in window)) {
  console.warn("This browser does not support notifications")
  return false
}
```

You check for support but not for previously denied permission. `Notification.permission === "denied"` means user actively refused. You should show different UI for denied vs never-asked.

#### 3. No Foreground Notification Display
```typescript
export async function onForegroundMessage(
  callback: (payload: unknown) => void,
): Promise<() => void> {
```

On web, foreground messages don't auto-display. You receive the payload but do nothing with it. On native, they appear in the notification tray. Inconsistent behavior.

#### 4. Notification Click Handling is Basic
```typescript
const urlToOpen = event.notification.data?.url || "/"
```

If notification contains deep link data, you just open the root. What about:
- Opening specific chat?
- Navigating to a particular screen?
- Passing parameters to the app?

---

## NATIVE NOTIFICATIONS: LESS BAD, STILL ISSUES

### What Works
- Using `@react-native-firebase/messaging` correctly
- Permission handling is proper
- Token refresh listener is set up

### Issues

#### 1. Background Handler is Never Set
```typescript
// native.ts exports this:
export function setBackgroundMessageHandler(
  handler: (message: FirebaseMessagingTypes.RemoteMessage) => Promise<void>,
): void {
  messaging().setBackgroundMessageHandler(handler)
}

// But it's never called anywhere in the codebase
```

Background notifications arrive, nothing happens. You defined the function but never wired it up. Probably should be called in `app.tsx` before any React renders.

#### 2. No Initial Notification Handling
When user taps a notification that launched the app (cold start), `messaging().getInitialNotification()` returns that notification. You're not checking for this anywhere. User taps notification, app opens, nothing happens.

#### 3. No Notification Channels (Android)
Android 8+ requires notification channels. You're not defining any. All your notifications go to a default channel with default behavior. Users can't customize notification sounds/vibration per notification type.

#### 4. Provisional Authorization Not Leveraged
```typescript
const enabled =
  authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  authStatus === messaging.AuthorizationStatus.PROVISIONAL
```

You accept provisional authorization but treat it the same as full authorization. Provisional notifications are silent and only show in Notification Center. You should track this and potentially re-prompt for full authorization later.

---

## CROSS-PLATFORM CONSISTENCY FAILURES

| Feature | Native | Web | Problem |
|---------|--------|-----|---------|
| Token Refresh | Listener | Polling | Web users might have stale tokens longer |
| Background Messages | Supported | Supported | Neither actually implemented |
| Foreground Display | Auto | Manual | Web notifications don't show |
| Deep Linking | Not implemented | Partially | Inconsistent UX |
| Permission Pre-prompt | None | None | Both lose users to permanent denial |
| Retry on Failure | None | None | Both fail silently |
| Offline Queue | None | None | Tokens lost if offline during registration |

---

## ERROR HANDLING: LOG AND PRAY

Throughout the codebase:
```typescript
} catch (error) {
  console.error("Failed to X:", error)
  setError("Failed to X")
}
```

This pattern appears 10+ times. Issues:

1. **Errors are swallowed** - No retry, no escalation, no user notification
2. **Generic messages** - "Failed to register" tells user nothing actionable
3. **No error classification** - Network error vs auth error vs quota error all treated same
4. **No telemetry** - You have Sentry installed but aren't reporting notification failures

---

## SUPABASE TOKEN TABLE: ASSUMED STRUCTURE

Based on your code:
```sql
CREATE TABLE push_tokens (
  user_id UUID REFERENCES auth.users(id),
  token TEXT NOT NULL,
  platform TEXT NOT NULL, -- 'ios' | 'android' | 'web'
  updated_at TIMESTAMPTZ,
  UNIQUE(user_id, platform)
);
```

### Problems with this design:

1. **One token per platform per user** - No multi-device support
2. **No device identifier** - Can't differentiate between devices
3. **No token metadata** - No app version, no OS version, no locale
4. **No token validity tracking** - No way to know if token is stale
5. **No RLS policies visible** - Anyone with anon key could potentially read all tokens?

---

## WHAT YOU'RE MISSING ENTIRELY

1. **Topic Subscriptions** - FCM supports topics for broadcast notifications. Not implemented.

2. **Notification Preferences** - Users can't opt out of specific notification types.

3. **Badge Count Management** - iOS badge count never updates.

4. **Notification Grouping** - 50 chat messages = 50 separate notifications.

5. **Notification Actions** - "Reply" and "Mark as Read" buttons on notifications.

6. **Analytics** - No tracking of notification delivery, open rates, or failures.

7. **A/B Testing** - No way to test different notification copies.

8. **Quiet Hours** - No respect for user's do-not-disturb preferences.

---

## PRIORITY FIXES

### Critical (Before Production)
1. Fix logout token cleanup race condition
2. Add background message handler
3. Add initial notification handling
4. Implement retry logic for token registration
5. Add proper error reporting to Sentry

### High Priority
1. Reduce foreground registration frequency
2. Fix multi-device token handling
3. Add notification channels for Android
4. Add permission pre-prompt
5. Sync service worker config with env vars

### Medium Priority
1. Add offline token registration queue
2. Implement deep linking from notifications
3. Add foreground notification display for web
4. Add notification preferences UI
5. Track notification analytics

### Low Priority
1. Topic subscriptions
2. Notification actions
3. A/B testing infrastructure
4. Quiet hours support

---

## FINAL VERDICT

This system will:
- Get tokens registered (usually)
- Deliver notifications (sometimes)
- Handle basic flows (barely)

This system will NOT:
- Scale to thousands of users
- Provide reliable delivery
- Give you debugging visibility
- Handle edge cases gracefully
- Provide a consistent cross-platform experience

You have a proof of concept, not a production system. Budget 2-3 weeks of hardening before relying on this for user communication.
