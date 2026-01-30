import { Platform } from "react-native"

import Config from "@/config"

import type { PushToken } from "./types"

export type { PushToken, PushTokenPlatform } from "./types"

const isWeb = Platform.OS === "web"

/**
 * Initialize the notification system.
 * For web, this initializes Firebase.
 * For native, Firebase is auto-initialized via the Expo config plugin.
 */
export async function initializeNotifications(): Promise<void> {
  if (isWeb) {
    const { initializeFirebaseWeb } = await import("./web")
    await initializeFirebaseWeb()
  }
  // Native initialization happens automatically via @react-native-firebase/app plugin
}

/**
 * Request notification permissions from the user.
 * Returns true if permission was granted.
 */
export async function requestPermissions(): Promise<boolean> {
  if (isWeb) {
    const { requestPermissions: webRequestPermissions } = await import("./web")
    return webRequestPermissions()
  }
  const { requestPermissions: nativeRequestPermissions } = await import("./native")
  return nativeRequestPermissions()
}

/**
 * Get the push notification token for the current platform.
 * For web, uses Firebase JS SDK with VAPID key.
 * For native, uses @react-native-firebase/messaging.
 */
export async function getPushToken(): Promise<PushToken | null> {
  if (isWeb) {
    const { getFCMToken } = await import("./web")
    return getFCMToken(Config.FIREBASE_VAPID_KEY)
  }
  const { getFCMToken } = await import("./native")
  return getFCMToken()
}

/**
 * Set up a listener for token refresh events.
 * Returns an unsubscribe function.
 */
export function setupTokenRefreshListener(callback: (token: string) => void): (() => void) | null {
  if (isWeb) {
    // Web doesn't have a direct token refresh API
    // Tokens are refreshed when getToken() is called
    return null
  }

  // Dynamic import for native module
  // We need to use require here because the listener needs to be set up synchronously
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { onTokenRefresh } = require("./native") as typeof import("./native")
  return onTokenRefresh(callback)
}

/**
 * Set up a listener for foreground messages.
 * Returns an unsubscribe function.
 */
export async function setupForegroundMessageListener(
  callback: (message: unknown) => void,
): Promise<(() => void) | null> {
  if (isWeb) {
    const { onForegroundMessage } = await import("./web")
    return await onForegroundMessage(callback)
  }
  const { onForegroundMessage } = await import("./native")
  return onForegroundMessage(callback)
}
