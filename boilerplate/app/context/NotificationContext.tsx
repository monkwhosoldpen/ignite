import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { AppState, AppStateStatus, Platform } from "react-native"
import { useMMKVString } from "react-native-mmkv"

import {
  initializeNotifications,
  requestPermissions,
  getPushToken,
  setupTokenRefreshListener,
} from "@/services/notifications"
import { supabase } from "@/services/supabase"

import { useAuth } from "./AuthContext"

export type NotificationContextType = {
  pushToken: string | null
  isPermissionGranted: boolean
  isLoading: boolean
  error: string | null
  requestNotificationPermission: () => Promise<boolean>
  refreshPushToken: () => Promise<void>
}

export const NotificationContext = createContext<NotificationContextType | null>(null)

export const NotificationProvider: FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated, user } = useAuth()
  const [pushToken, setPushToken] = useMMKVString("NotificationProvider.pushToken")
  const [isPermissionGranted, setIsPermissionGranted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const appState = useRef(AppState.currentState)
  const isInitialized = useRef(false)

  // Register token with Supabase backend
  const registerTokenWithBackend = useCallback(
    async (token: string) => {
      if (!user) return

      try {
        const platform = Platform.OS as "web" | "ios" | "android"

        // Upsert the push token in Supabase
        const { error: upsertError } = await supabase.from("push_tokens").upsert(
          {
            user_id: user.id,
            token,
            platform,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "user_id,platform",
          },
        )

        if (upsertError) {
          console.error("Failed to register push token:", upsertError)
          setError("Failed to register for notifications")
        }
      } catch (err) {
        console.error("Failed to register push token:", err)
        setError("Failed to register for notifications")
      }
    },
    [user],
  )

  // Unregister token from backend
  const unregisterTokenFromBackend = useCallback(async () => {
    if (!user || !pushToken) return

    try {
      await supabase.from("push_tokens").delete().eq("user_id", user.id)
    } catch (err) {
      console.error("Failed to unregister push token:", err)
    }
  }, [user, pushToken])

  // Initialize notifications on mount
  useEffect(() => {
    if (isInitialized.current) return
    isInitialized.current = true

    initializeNotifications()
  }, [])

  // Register token when user authenticates
  useEffect(() => {
    if (isAuthenticated && user && pushToken) {
      registerTokenWithBackend(pushToken)
    }
  }, [isAuthenticated, user, pushToken, registerTokenWithBackend])

  // Unregister token when user logs out
  useEffect(() => {
    if (!isAuthenticated && pushToken) {
      unregisterTokenFromBackend()
    }
  }, [isAuthenticated, pushToken, unregisterTokenFromBackend])

  // Setup token refresh listener
  useEffect(() => {
    const unsubscribe = setupTokenRefreshListener((newToken) => {
      setPushToken(newToken)
      if (isAuthenticated && user) {
        registerTokenWithBackend(newToken)
      }
    })

    return () => unsubscribe?.()
  }, [isAuthenticated, user, setPushToken, registerTokenWithBackend])

  // Handle app state changes (re-register on foreground)
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active" &&
        isAuthenticated &&
        user &&
        pushToken
      ) {
        // Re-register token when app comes to foreground
        registerTokenWithBackend(pushToken)
      }
      appState.current = nextAppState
    }

    const subscription = AppState.addEventListener("change", handleAppStateChange)
    return () => subscription.remove()
  }, [isAuthenticated, user, pushToken, registerTokenWithBackend])

  const requestNotificationPermission = useCallback(async (): Promise<boolean> => {
    setIsLoading(true)
    setError(null)

    try {
      const granted = await requestPermissions()
      setIsPermissionGranted(granted)

      if (granted) {
        // Get and register the push token
        const tokenResult = await getPushToken()

        if (tokenResult) {
          setPushToken(tokenResult.token)

          if (isAuthenticated && user) {
            await registerTokenWithBackend(tokenResult.token)
          }
        } else {
          setError("Failed to get push token")
        }
      }

      return granted
    } catch (err) {
      setError("Failed to request notification permission")
      return false
    } finally {
      setIsLoading(false)
    }
  }, [isAuthenticated, user, setPushToken, registerTokenWithBackend])

  const refreshPushToken = useCallback(async (): Promise<void> => {
    setIsLoading(true)
    setError(null)

    try {
      const tokenResult = await getPushToken()

      if (tokenResult) {
        setPushToken(tokenResult.token)

        if (isAuthenticated && user) {
          await registerTokenWithBackend(tokenResult.token)
        }
      } else {
        setError("Failed to get push token")
      }
    } catch (err) {
      setError("Failed to refresh push token")
    } finally {
      setIsLoading(false)
    }
  }, [isAuthenticated, user, setPushToken, registerTokenWithBackend])

  const value = {
    pushToken: pushToken ?? null,
    isPermissionGranted,
    isLoading,
    error,
    requestNotificationPermission,
    refreshPushToken,
  }

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}
