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
  SUPABASE_URL: 'https://ivmqzthpqocpfplcjgfd.supabase.co',
  SUPABASE_ANON_KEY: 'sb_publishable_yPWUR0b2UWBbxD6XsRryZg_aoyQLteE',

  /**
   * Firebase VAPID key for web push notifications
   * Get from Firebase Console > Cloud Messaging > Web Push certificates
   * Only needed for web platform
   */
  FIREBASE_VAPID_KEY: "BNM6w_tOQ5PBDCVYJ9j7Wh_HSRy_oWxcWLzB4m8fLxVU_9aYHR_BVvGUcKIeU2Zq8cFDH6cC5Ew7aKHgY4b4smU",

  /**
   * Firebase Web SDK configuration
   * Get from Firebase Console > Project Settings > General > Your apps > Web app
   */
  FIREBASE_WEB_CONFIG: {
    apiKey: "AIzaSyDr9iF87shHnvCOIsVT45_ABI_cBmpZ_BA",
    authDomain: "beta-95455.firebaseapp.com",
    projectId: "beta-95455",
    storageBucket: "beta-95455.appspot.com",
    messagingSenderId: "148420292781",
    appId: "1:148420292781:web:674527e6be26565fdc9624",
    measurementId: "G-108X9FEPWF",
  },
}

export default BaseConfig
