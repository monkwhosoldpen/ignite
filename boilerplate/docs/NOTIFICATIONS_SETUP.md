# Push Notifications Setup Guide

This guide covers setting up push notifications for both **Native (iOS/Android)** and **Web/PWA** platforms.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Your App                                  │
├─────────────────────────────────────────────────────────────────┤
│  NotificationContext (app/context/NotificationContext.tsx)       │
│  - Unified API for both platforms                                │
│  - Token management & sync                                       │
│  - Permission handling                                           │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
┌─────────────────────────┐     ┌─────────────────────────┐
│   Native Platform        │     │   Web Platform          │
│   (iOS/Android)          │     │   (Browser/PWA)         │
├─────────────────────────┤     ├─────────────────────────┤
│ @react-native-firebase/  │     │ Firebase JS SDK         │
│ messaging                │     │ (firebase/messaging)    │
├─────────────────────────┤     ├─────────────────────────┤
│ services/notifications/  │     │ services/notifications/ │
│ native.ts                │     │ web.ts                  │
├─────────────────────────┤     ├─────────────────────────┤
│ Direct FCM connection    │     │ Service Worker +        │
│ via native SDK           │     │ VAPID key auth          │
└─────────────────────────┘     └─────────────────────────┘
              │                               │
              └───────────────┬───────────────┘
                              ▼
                 ┌─────────────────────────┐
                 │  Firebase Cloud         │
                 │  Messaging (FCM)        │
                 └─────────────────────────┘
```

## Prerequisites

- Firebase project created at [Firebase Console](https://console.firebase.google.com)
- Node.js 18+ installed
- For native: Xcode (iOS) or Android Studio (Android)

---

## Step 1: Firebase Console Setup

### 1.1 Create/Select Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project" or select existing project
3. Note your **Project ID** (e.g., `beta-95455`)

### 1.2 Enable Cloud Messaging API
1. Go to **Project Settings** (gear icon) → **Cloud Messaging**
2. If "Cloud Messaging API (V1)" shows as disabled:
   - Click the link to Google Cloud Console
   - Enable the **Firebase Cloud Messaging API**
3. Verify it shows "Enabled"

### 1.3 Add Web App
1. Go to **Project Settings** → **General**
2. Scroll to "Your apps" section
3. Click **Add app** → Select **Web** (`</>` icon)
4. Enter app nickname (e.g., "My App Web")
5. Click **Register app**
6. Copy the Firebase config object:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123",
     measurementId: "G-XXXXXX"
   };
   ```

### 1.4 Generate Web Push Certificate (VAPID Key)
1. Go to **Project Settings** → **Cloud Messaging**
2. Scroll to **Web configuration** section
3. Under "Web Push certificates":
   - Click **Generate key pair**
   - Copy the generated key (starts with `B...`)
4. This is your **VAPID_KEY**

### 1.5 Add iOS App (for native iOS)
1. Go to **Project Settings** → **General**
2. Click **Add app** → Select **iOS**
3. Enter your iOS bundle ID (e.g., `com.yourapp.ios`)
4. Download `GoogleService-Info.plist`
5. Place it in `ios/[YourAppName]/GoogleService-Info.plist`

### 1.6 Add Android App (for native Android)
1. Go to **Project Settings** → **General**
2. Click **Add app** → Select **Android**
3. Enter your Android package name (e.g., `com.yourapp.android`)
4. Download `google-services.json`
5. Place it in `android/app/google-services.json`

### 1.7 Authorize Domains (for Web)
1. Go to **Authentication** → **Settings** → **Authorized domains**
2. Add these domains:
   - `localhost` (for development)
   - Your production domain (e.g., `yourapp.com`)

---

## Step 2: App Configuration

### 2.1 Update Config File

Edit `app/config/config.base.ts`:

```typescript
FIREBASE_VAPID_KEY: "YOUR_VAPID_KEY_FROM_STEP_1.4",

FIREBASE_WEB_CONFIG: {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
},
```

### 2.2 Update Service Worker

Edit `public/firebase-messaging-sw.js` with the same Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
};
```

---

## Step 3: Native Build Setup

### 3.1 Install Dependencies
```bash
pnpm install @react-native-firebase/app @react-native-firebase/messaging
```

### 3.2 Run Prebuild
```bash
# Clean prebuild to regenerate native folders
npx expo prebuild --clean
```

### 3.3 Add Firebase Config Files

**iOS:**
```bash
# Copy GoogleService-Info.plist to iOS project
cp ~/Downloads/GoogleService-Info.plist ios/[YourAppName]/
```

**Android:**
```bash
# Copy google-services.json to Android project
cp ~/Downloads/google-services.json android/app/
```

### 3.4 iOS: Enable Push Notification Capability
1. Open `ios/[YourAppName].xcworkspace` in Xcode
2. Select your target → **Signing & Capabilities**
3. Click **+ Capability** → Add **Push Notifications**
4. Add **Background Modes** → Check **Remote notifications**

### 3.5 Build Native Apps
```bash
# iOS
npx expo run:ios

# Android
npx expo run:android
```

---

## Step 4: Testing

### 4.1 Test on Web
1. Run `pnpm start` and open in browser
2. Go to Debug screen
3. Click "Request Permission"
4. Check browser console for FCM token

### 4.2 Test on Native
1. Run app on physical device (simulators don't support push)
2. Go to Debug screen
3. Click "Request Permission"
4. Check console for FCM token

### 4.3 Send Test Notification
1. Go to Firebase Console → **Cloud Messaging**
2. Click **Create your first campaign** → **Firebase Notification messages**
3. Enter title and body
4. Click **Send test message**
5. Paste the FCM token from your app
6. Click **Test**

---

## File Structure

```
app/
├── config/
│   └── config.base.ts          # Firebase config (VAPID_KEY, FIREBASE_WEB_CONFIG)
├── context/
│   └── NotificationContext.tsx  # Unified notification state management
├── services/
│   └── notifications/
│       ├── index.ts             # Platform router (web vs native)
│       ├── native.ts            # iOS/Android implementation
│       ├── web.ts               # Web/PWA implementation
│       └── types.ts             # Shared types
└── screens/
    └── DemoDebugScreen.tsx      # Debug UI for testing

public/
└── firebase-messaging-sw.js     # Service worker for web background notifications
```

---

## Troubleshooting

### Error: 401 Unauthorized
- Cloud Messaging API not enabled → Enable in Google Cloud Console
- Domain not authorized → Add to Firebase Auth authorized domains
- VAPID key mismatch → Regenerate and update in both config and service worker

### Error: No FCM Token
- Notification permission denied → Check browser/device settings
- Service worker not registered (web) → Check console for SW errors
- Not on physical device (native) → Push requires real device

### Error: Token Subscribe Failed
- Firebase config incorrect → Verify apiKey, projectId, messagingSenderId
- Service worker config mismatch → Ensure SW has same config as app

### iOS: Notifications Not Received
- Missing Push Notification capability → Add in Xcode
- Missing APN key in Firebase → Upload in Project Settings → Cloud Messaging
- Background modes not enabled → Add Remote notifications capability

### Android: Notifications Not Received
- Missing google-services.json → Download and place in android/app/
- Incorrect package name → Must match Firebase Android app config

---

## Security Notes

1. **Never commit** `google-services.json` or `GoogleService-Info.plist` to public repos
2. Add to `.gitignore`:
   ```
   android/app/google-services.json
   ios/*/GoogleService-Info.plist
   ```
3. Firebase web config (apiKey) is safe to expose - it's restricted by domain
4. VAPID key is public - safe to include in client code

---

## Production Checklist

- [ ] Cloud Messaging API enabled
- [ ] Web app registered in Firebase
- [ ] iOS app registered in Firebase
- [ ] Android app registered in Firebase
- [ ] VAPID key generated and configured
- [ ] APNs key uploaded (for iOS)
- [ ] Production domain authorized
- [ ] Service worker deployed
- [ ] google-services.json in Android build
- [ ] GoogleService-Info.plist in iOS build
- [ ] Push capability enabled in Xcode
- [ ] Tested on real devices
