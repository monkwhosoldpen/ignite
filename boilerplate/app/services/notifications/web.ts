import { initializeApp, getApps, FirebaseApp } from "firebase/app"
import { getMessaging, getToken, onMessage, Messaging } from "firebase/messaging"

import Config from "@/config"

import type { PushToken } from "./types"

let app: FirebaseApp | null = null
let messagingInstance: Messaging | null = null
let serviceWorkerRegistration: ServiceWorkerRegistration | null = null

/**
 * Register the Firebase messaging service worker.
 * This is required for background notifications on web.
 */
async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return null
  }

  try {
    const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js")
    console.log("Firebase messaging service worker registered:", registration.scope)
    return registration
  } catch (error) {
    console.error("Failed to register Firebase messaging service worker:", error)
    return null
  }
}

/**
 * Initialize Firebase for web.
 * Should be called once at app startup.
 */
export async function initializeFirebaseWeb(): Promise<void> {
  if (typeof window === "undefined") return // SSR guard

  // Check if Firebase config is properly configured
  if (!Config.FIREBASE_WEB_CONFIG.projectId || !Config.FIREBASE_WEB_CONFIG.apiKey) {
    console.warn("Firebase configuration is missing required fields. Notifications will be disabled.")
    console.warn("Please set EXPO_PUBLIC_FIREBASE_PROJECT_ID and EXPO_PUBLIC_FIREBASE_API_KEY in your environment variables.")
    return
  }

  try {
    if (getApps().length === 0) {
      app = initializeApp(Config.FIREBASE_WEB_CONFIG)
      messagingInstance = getMessaging(app)
    } else {
      app = getApps()[0]
      messagingInstance = getMessaging(app)
    }

    // Register service worker for background notifications
    serviceWorkerRegistration = await registerServiceWorker()
  } catch (error) {
    console.error("Failed to initialize Firebase:", error)
    // Don't throw the error to prevent app crash
  }
}

/**
 * Request notification permissions in the browser.
 */
export async function requestPermissions(): Promise<boolean> {
  if (typeof window === "undefined") return false
  if (!("Notification" in window)) {
    console.warn("This browser does not support notifications")
    return false
  }

  try {
    const permission = await Notification.requestPermission()
    return permission === "granted"
  } catch (error) {
    console.error("Failed to request notification permission:", error)
    return false
  }
}

/**
 * Get the FCM token for web push notifications.
 * Requires a VAPID key from Firebase Console.
 */
export async function getFCMToken(vapidKey: string): Promise<PushToken | null> {
  if (typeof window === "undefined") return null

  if (!messagingInstance) {
    await initializeFirebaseWeb()
  }

  if (!messagingInstance) {
    console.warn("Firebase messaging not initialized - check your Firebase configuration")
    return null
  }

  if (!vapidKey) {
    console.warn("VAPID key is required for web push notifications")
    return null
  }

  try {
    // Use registered service worker or try to get existing one
    const registration = serviceWorkerRegistration || (await navigator.serviceWorker.getRegistration())
    if (!registration) {
      console.warn("Service worker not registered. Register firebase-messaging-sw.js first.")
    }

    const token = await getToken(messagingInstance, {
      vapidKey,
      serviceWorkerRegistration: registration || undefined,
    })

    if (!token) {
      console.warn("No FCM token received")
      return null
    }

    return { token, platform: "web" }
  } catch (error) {
    console.error("Failed to get FCM token for web:", error)
    return null
  }
}

/**
 * Register a callback for foreground message events on web.
 * Returns an unsubscribe function.
 */
export async function onForegroundMessage(
  callback: (payload: unknown) => void,
): Promise<() => void> {
  if (!messagingInstance) {
    await initializeFirebaseWeb()
  }

  if (!messagingInstance) {
    console.error("Firebase messaging not initialized")
    return () => {}
  }

  return onMessage(messagingInstance, callback)
}
