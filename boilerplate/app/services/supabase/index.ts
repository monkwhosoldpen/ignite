import { createClient, SupabaseClient } from "@supabase/supabase-js"
import { MMKV } from "react-native-mmkv"

import Config from "@/config"

/**
 * Custom storage adapter for Supabase using MMKV.
 * This provides fast, synchronous storage for auth tokens.
 */
const supabaseStorage = new MMKV({ id: "supabase-storage" })

const mmkvStorageAdapter = {
  getItem: (key: string): string | null => {
    return supabaseStorage.getString(key) ?? null
  },
  setItem: (key: string, value: string): void => {
    supabaseStorage.set(key, value)
  },
  removeItem: (key: string): void => {
    supabaseStorage.delete(key)
  },
}

/**
 * Supabase client instance configured with MMKV storage.
 * Auto-refreshes tokens and persists sessions.
 */
export const supabase: SupabaseClient = createClient(
  Config.SUPABASE_URL,
  Config.SUPABASE_ANON_KEY,
  {
    auth: {
      storage: mmkvStorageAdapter,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false, // Important for React Native
    },
  },
)
