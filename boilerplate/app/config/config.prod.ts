/**
 * These are configuration settings for the production environment.
 *
 * Do not include API secrets in this file or anywhere in your JS.
 *
 * https://reactnative.dev/docs/security#storing-sensitive-info
 */
export default {
  API_URL: "https://api.rss2json.com/v1/",

  // Override Supabase config for production if needed
  SUPABASE_URL: 'https://ivmqzthpqocpfplcjgfd.supabase.co',
  SUPABASE_ANON_KEY: 'sb_publishable_yPWUR0b2UWBbxD6XsRryZg_aoyQLteE',

  // Override Firebase config for production if needed
  FIREBASE_VAPID_KEY: "BNM6w_tOQ5PBDCVYJ9j7Wh_HSRy_oWxcWLzB4m8fLxVU_9aYHR_BVvGUcKIeU2Zq8cFDH6cC5Ew7aKHgY4b4smU",
  // FIREBASE_CONFIG: { ... },
}
