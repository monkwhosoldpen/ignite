import { Platform } from "react-native"
import * as Device from "expo-device"
import messaging, { FirebaseMessagingTypes } from "@react-native-firebase/messaging"

import type { PushToken, PushTokenPlatform } from "./types"

/**
 * Request notification permissions on native platforms.
 * Uses Firebase Messaging for permission requests.
 */
export async function requestPermissions(): Promise<boolean> {
  if (!Device.isDevice) {
    console.warn("Push notifications require a physical device")
    return false
  }

  try {
    const authStatus = await messaging().requestPermission()
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL

    return enabled
  } catch (error) {
    console.error("Failed to request notification permissions:", error)
    return false
  }
}

/**
 * Get the FCM token for the current device.
 * Uses @react-native-firebase/messaging for direct FCM token access.
 */
export async function getFCMToken(): Promise<PushToken | null> {
  if (!Device.isDevice) {
    console.warn("Push notifications require a physical device")
    return null
  }

  try {
    // Ensure we have permission first
    const hasPermission = await messaging().hasPermission()
    if (
      hasPermission !== messaging.AuthorizationStatus.AUTHORIZED &&
      hasPermission !== messaging.AuthorizationStatus.PROVISIONAL
    ) {
      console.warn("Notification permission not granted")
      return null
    }

    const token = await messaging().getToken()
    const platform: PushTokenPlatform = Platform.OS as PushTokenPlatform

    return { token, platform }
  } catch (error) {
    console.error("Failed to get FCM token:", error)
    return null
  }
}

/**
 * Register a callback for token refresh events.
 * Returns an unsubscribe function.
 */
export function onTokenRefresh(callback: (token: string) => void): () => void {
  return messaging().onTokenRefresh(callback)
}

/**
 * Register a callback for foreground message events.
 * Returns an unsubscribe function.
 */
export function onForegroundMessage(
  callback: (message: FirebaseMessagingTypes.RemoteMessage) => void,
): () => void {
  return messaging().onMessage(callback)
}

/**
 * Set up background message handler.
 * This should be called at app startup, outside of React components.
 */
export function setBackgroundMessageHandler(
  handler: (message: FirebaseMessagingTypes.RemoteMessage) => Promise<void>,
): void {
  messaging().setBackgroundMessageHandler(handler)
}
