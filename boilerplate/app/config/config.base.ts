export interface FirebaseWebConfig {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
  measurementId?: string
}

export interface ConfigBaseProps {
  persistNavigation: "always" | "dev" | "prod" | "never"
  catchErrors: "always" | "dev" | "prod" | "never"
  exitRoutes: string[]
  SUPABASE_URL: string
  SUPABASE_ANON_KEY: string
  SENTRY_DSN: string
  ANALYTICS_KEY: string
  // Web push only - get from Firebase Console > Cloud Messaging > Web Push certificates
  FIREBASE_VAPID_KEY: string
  // Firebase Web SDK config - required for web notifications
  FIREBASE_WEB_CONFIG: FirebaseWebConfig
}

export type PersistNavigationConfig = ConfigBaseProps["persistNavigation"]

const BaseConfig: ConfigBaseProps = {
  // This feature is particularly useful in development mode, but
  // can be used in production as well if you prefer.
  persistNavigation: "dev",

  /**
   * Only enable if we're catching errors in the right environment
   */
  catchErrors: "always",

  /**
   * This is a list of all the route names that will exit the app if the back button
   * is pressed while in that screen. Only affects Android.
   */
  exitRoutes: ["Welcome"],

  /**
   * Supabase configuration
   * Replace these with your actual Supabase project values
   */
  SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key",
  SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN || "",
  ANALYTICS_KEY: process.env.EXPO_PUBLIC_ANALYTICS_KEY || "",

  /**
   * Firebase VAPID key for web push notifications
   * Get from Firebase Console > Cloud Messaging > Web Push certificates
   * Only needed for web platform
   */
  FIREBASE_VAPID_KEY: process.env.EXPO_PUBLIC_FIREBASE_VAPID_KEY || "",

  /**
   * Firebase Web SDK configuration
   * Get from Firebase Console > Project Settings > General > Your apps > Web app
   */
  FIREBASE_WEB_CONFIG: {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || "",
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || "",
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || "",
    measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
  },
}

export default BaseConfig
