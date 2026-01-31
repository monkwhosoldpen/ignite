import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { Session, User, AuthError } from "@supabase/supabase-js"

import { supabase } from "@/services/supabase"

export type AuthResult = { success: true } | { success: false; error: AuthError }

export type AuthContextType = {
  isAuthenticated: boolean
  isLoading: boolean
  user: User | null
  session: Session | null
  authEmail: string
  setAuthEmail: (email: string) => void
  signIn: (email: string, password: string) => Promise<AuthResult>
  signUp: (email: string, password: string) => Promise<AuthResult>
  logout: () => Promise<void>
  validationError: string
}

export const AuthContext = createContext<AuthContextType | null>(null)

export interface AuthProviderProps {}

export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [authEmail, setAuthEmail] = useState("")

  // Initialize: check existing session and listen for auth changes
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const {
          data: { session: currentSession },
        } = await supabase.auth.getSession()
        setSession(currentSession)
        setUser(currentSession?.user ?? null)
      } catch (error) {
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      setUser(newSession?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      return { success: false, error }
    }

    return { success: true }
  }, [])

  const signUp = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    // Sign up with auto-confirm (instant access, no email confirmation)
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      return { success: false, error }
    }

    return { success: true }
  }, [])

  const logout = useCallback(async () => {
    await supabase.auth.signOut()
    setSession(null)
    setUser(null)
    setAuthEmail("")
  }, [])

  const validationError = useMemo(() => {
    if (!authEmail || authEmail.length === 0) return "can't be blank"
    if (authEmail.length < 6) return "must be at least 6 characters"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authEmail)) return "must be a valid email address"
    return ""
  }, [authEmail])

  const value = {
    isAuthenticated: !!session,
    isLoading,
    user,
    session,
    authEmail,
    setAuthEmail,
    signIn,
    signUp,
    logout,
    validationError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}

// @demo remove-file
