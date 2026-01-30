# BRUTAL CODE REVIEW: Auth & Notifications

**Reviewer**: Claude Code Analysis
**Date**: 2026-01-30
**Verdict**: NOT PRODUCTION READY

---

## OVERALL SCORES

| Area | Score | Status |
|------|-------|--------|
| **Auth (Ignite)** | 5/10 | Mediocre |
| **Auth (Showcase)** | N/A | File missing/deleted |
| **Notifications (Ignite)** | 4/10 | Poor |
| **Notifications (Showcase)** | 4/10 | Poor |
| **Security** | 3/10 | Critical Issues |
| **Error Handling** | 4/10 | Inadequate |
| **Type Safety** | 6/10 | Acceptable |

---

## CRITICAL ISSUES (Fix Before Production)

### 1. HARDCODED CREDENTIALS IN SOURCE CODE
**Severity**: CRITICAL
**Files**:
- `config.base.ts` - Supabase keys hardcoded
- `firebase-messaging-sw.js` - Firebase config hardcoded
- `config.base.ts` - VAPID key hardcoded

```typescript
// THIS IS IN YOUR SOURCE CODE - ANYONE CAN SEE IT
SUPABASE_URL: 'https://ivmqzthpqocpfplcjgfd.supabase.co',
SUPABASE_ANON_KEY: 'sb_publishable_yPWUR0b2UWBbxD6XsRryZg_aoyQLteE',
```

**Risk**: Keys can be extracted from your app bundle. If these are real keys, they're compromised.

**ACTION REQUIRED**:
- [ ] Move ALL credentials to environment variables
- [ ] Use `expo-constants` or `react-native-config` for runtime config
- [ ] Rotate ALL exposed keys immediately
- [ ] Add `.env` to `.gitignore`

---

### 2. NO TOKEN VALIDATION ON BACKEND
**Severity**: CRITICAL
**File**: `NotificationContext.tsx:53-63`

```typescript
// Directly upserting to Supabase without ANY validation
const { error: upsertError } = await supabase.from("push_tokens").upsert({
  user_id: user.id,
  token,
  platform,
  updated_at: new Date().toISOString(),
})
```

**Risk**:
- No token format validation (could store garbage)
- No rate limiting (user can spam database)
- No duplicate token detection across users
- Attacker could register fake tokens

**ACTION REQUIRED**:
- [ ] Validate token format before storing
- [ ] Add rate limiting (max 5 devices per user)
- [ ] Check if token already exists for another user
- [ ] Use RLS policies on `push_tokens` table

---

### 3. RACE CONDITION IN AUTH STATE
**Severity**: HIGH
**File**: `AuthContext.tsx:69-79`

```typescript
const signIn = useCallback(async (email: string, password: string): Promise<AuthResult> => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { success: false, error }
  }

  // RACE CONDITION: onAuthStateChange listener may fire BEFORE these setters
  setSession(data.session)  // <-- May be stale
  setUser(data.user)        // <-- May be stale
  return { success: true }
}, [])
```

**Risk**: State can be inconsistent between manual setters and the auth listener.

**ACTION REQUIRED**:
- [ ] Remove manual `setSession`/`setUser` calls in `signIn`/`signUp`
- [ ] Let `onAuthStateChange` be the single source of truth
- [ ] Or disable the listener during manual auth operations

---

### 4. SILENT FAILURES EVERYWHERE
**Severity**: HIGH
**Files**: Multiple

```typescript
// NotificationContext.tsx:78-86
const unregisterTokenFromBackend = useCallback(async () => {
  if (!user || !pushToken) return  // Silent exit - no logging

  try {
    await supabase.from("push_tokens").delete().eq("user_id", user.id)
    // No success confirmation
  } catch (err) {
    console.error("Failed to unregister push token:", err)
    // Error swallowed - user never knows
  }
}, [user, pushToken])
```

**Risk**: Operations fail silently, leading to inconsistent state.

**ACTION REQUIRED**:
- [ ] Return success/failure from all operations
- [ ] Show user-facing error messages
- [ ] Add retry logic for transient failures
- [ ] Log all failures to error tracking service

---

### 5. NO LOGOUT CLEANUP FOR TOKENS
**Severity**: HIGH
**File**: `NotificationContext.tsx:104-108`

```typescript
// Unregister token when user logs out
useEffect(() => {
  if (!isAuthenticated && pushToken) {
    unregisterTokenFromBackend()  // This depends on `user` which is now NULL!
  }
}, [isAuthenticated, pushToken, unregisterTokenFromBackend])
```

**Bug**: When user logs out, `user` becomes `null`, so `unregisterTokenFromBackend` exits immediately without deleting the token.

**ACTION REQUIRED**:
- [ ] Store user ID before logout
- [ ] Pass user ID explicitly to unregister function
- [ ] Or delete token BEFORE clearing auth state

---

## MEDIUM ISSUES

### 6. MEMORY LEAK - MISSING CLEANUP
**Severity**: MEDIUM
**File**: `NotificationContext.tsx:89-94`

```typescript
useEffect(() => {
  if (isInitialized.current) return
  isInitialized.current = true

  initializeNotifications()  // Async function, no cleanup, no error handling
}, [])
```

**Risk**: If `initializeNotifications()` fails, there's no recovery. Component may be in broken state.

**ACTION REQUIRED**:
- [ ] Add error handling with state update
- [ ] Add cleanup function for web service worker
- [ ] Consider retry mechanism

---

### 7. STALE CLOSURE IN TOKEN REFRESH
**Severity**: MEDIUM
**File**: `NotificationContext.tsx:110-120`

```typescript
useEffect(() => {
  const unsubscribe = setupTokenRefreshListener((newToken) => {
    setPushToken(newToken)
    if (isAuthenticated && user) {  // <-- These may be stale!
      registerTokenWithBackend(newToken)
    }
  })

  return () => unsubscribe?.()
}, [isAuthenticated, user, setPushToken, registerTokenWithBackend])
```

**Risk**: Callback closure captures stale `isAuthenticated` and `user` values.

**ACTION REQUIRED**:
- [ ] Use refs for values accessed in callbacks
- [ ] Or restructure to avoid closure over changing values

---

### 8. WEB: NO PERMISSION CHECK BEFORE TOKEN REQUEST
**Severity**: MEDIUM
**File**: `web.ts:73-107`

```typescript
export async function getFCMToken(vapidKey: string): Promise<PushToken | null> {
  // Doesn't check if permission was granted before requesting token
  // Native version does this check, web version doesn't

  const token = await getToken(messagingInstance, { vapidKey, ... })
```

**Risk**: Inconsistent behavior between platforms. May throw on web if permission denied.

**ACTION REQUIRED**:
- [ ] Check `Notification.permission === 'granted'` before `getToken()`
- [ ] Align behavior with native implementation

---

### 9. NO INPUT VALIDATION IN AUTH
**Severity**: MEDIUM
**File**: `AuthContext.tsx:69-79`

```typescript
const signIn = useCallback(async (email: string, password: string): Promise<AuthResult> => {
  // No validation! Empty strings, SQL injection, anything goes
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
```

**Risk**: Supabase handles this, but defense in depth is missing.

**ACTION REQUIRED**:
- [ ] Validate email format before API call
- [ ] Validate password minimum length
- [ ] Sanitize inputs
- [ ] Add rate limiting for failed attempts

---

### 10. INCONSISTENT ERROR TYPES
**Severity**: MEDIUM
**Files**: Multiple

```typescript
// Auth returns typed error
return { success: false, error: AuthError }

// Notifications just sets string
setError("Failed to get push token")  // No error object, no code
```

**Risk**: Inconsistent error handling makes debugging difficult.

**ACTION REQUIRED**:
- [ ] Create unified error type
- [ ] Include error codes for programmatic handling
- [ ] Include original error for debugging

---

## LOW ISSUES

### 11. EXCESSIVE RE-RENDERS
**File**: `NotificationContext.tsx:197-204`

```typescript
const value = {
  pushToken: pushToken ?? null,
  isPermissionGranted,
  isLoading,
  error,
  requestNotificationPermission,
  refreshPushToken,
}
// No useMemo - new object on every render
```

**ACTION REQUIRED**:
- [ ] Wrap `value` in `useMemo`

---

### 12. CONSOLE.LOG IN PRODUCTION
**Files**: Multiple

```typescript
console.log("Firebase messaging service worker registered:", registration.scope)
console.warn("Push notifications require a physical device")
console.error("Failed to register push token:", err)
```

**ACTION REQUIRED**:
- [ ] Use proper logging library
- [ ] Disable console in production
- [ ] Send errors to crash reporting service

---

### 13. MAGIC STRINGS
**File**: `NotificationContext.tsx:37`

```typescript
const [pushToken, setPushToken] = useMMKVString("NotificationProvider.pushToken")
```

**ACTION REQUIRED**:
- [ ] Move storage keys to constants file
- [ ] Use consistent naming convention

---

### 14. NO TYPESCRIPT STRICT MODE ISSUES
**File**: `web.ts:113-125`

```typescript
export async function onForegroundMessage(
  callback: (payload: unknown) => void,  // unknown instead of proper type
): Promise<() => void> {
```

**ACTION REQUIRED**:
- [ ] Use proper Firebase message type
- [ ] Align with native implementation

---

## ARCHITECTURE ISSUES

### 15. NO OFFLINE SUPPORT
Both auth and notifications assume always-online.

**ACTION REQUIRED**:
- [ ] Queue token registration when offline
- [ ] Retry failed operations when back online
- [ ] Show offline indicator to user

---

### 16. NO MULTI-DEVICE SUPPORT
Current implementation overwrites token per user+platform.

```typescript
onConflict: "user_id,platform"  // Only one token per platform
```

**ACTION REQUIRED**:
- [ ] Support multiple devices per user
- [ ] Track device metadata (name, last active)
- [ ] Allow user to manage devices

---

### 17. NO TOKEN EXPIRY HANDLING
Tokens are stored forever with no expiry check.

**ACTION REQUIRED**:
- [ ] Add `expires_at` column
- [ ] Clean up expired tokens
- [ ] Refresh tokens proactively

---

## SECURITY CHECKLIST

- [ ] **Credentials in env vars** - FAILING
- [ ] **Input validation** - FAILING
- [ ] **Rate limiting** - FAILING
- [ ] **Token validation** - FAILING
- [ ] **Proper error handling** - FAILING
- [ ] **Secure storage** - PARTIAL (MMKV is good)
- [ ] **Auth state management** - PARTIAL
- [ ] **Logout cleanup** - FAILING
- [ ] **HTTPS only** - ASSUMED OK
- [ ] **RLS policies** - UNKNOWN

---

## ACTIONABLE FIXES (Priority Order)

### P0 - Fix Today
1. Move credentials to environment variables
2. Fix logout token cleanup bug
3. Add token format validation

### P1 - Fix This Week
4. Remove race condition in auth state
5. Add permission check in web token request
6. Add proper error handling with user feedback
7. Fix stale closure in token refresh

### P2 - Fix This Sprint
8. Add input validation
9. Add retry logic for transient failures
10. Implement proper logging
11. Add offline support

### P3 - Technical Debt
12. Unify error types
13. Add useMemo for context values
14. Multi-device support
15. Token expiry handling

---

## VERDICT

**DO NOT SHIP TO PRODUCTION** until P0 and P1 issues are resolved.

The code works for happy path development but will fail under real-world conditions:
- Users with poor connectivity
- Malicious actors
- Edge cases (logout during token refresh, etc.)
- Scale (no rate limiting, no cleanup)

Estimated effort to production-ready: **2-3 days** of focused work.
