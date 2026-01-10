"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { 
  GoogleAuthProvider, 
  GithubAuthProvider, 
  signInWithPopup, 
  signInWithPhoneNumber, 
  signOut,
  type ConfirmationResult,
  type RecaptchaVerifier
} from "firebase/auth"
import { auth } from "./firebase"

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  photoURL?: string
  phoneNumber?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>
  logout: () => Promise<void>
  loginWithGoogle: () => Promise<boolean>
  loginWithGithub: () => Promise<boolean>
  loginWithPhone: (phoneNumber: string, appVerifier: any) => Promise<ConfirmationResult | null>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session from local storage (for mock auth)
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }

    // Listen for Firebase auth state changes
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const nameParts = firebaseUser.displayName?.split(" ") || []
        const firstName = nameParts[0] || "User"
        const lastName = nameParts.slice(1).join(" ") || ""
        
        const newUser: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || "",
          firstName,
          lastName,
          photoURL: firebaseUser.photoURL || "",
          phoneNumber: firebaseUser.phoneNumber || ""
        }
        setUser(newUser)
        localStorage.setItem("user", JSON.stringify(newUser))
      }
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - will be replaced with WooCommerce API
    // In production, this would validate against WooCommerce customers
    if (email && password.length >= 6) {
      const mockUser = {
        id: "1",
        email,
        firstName: email.split("@")[0],
        lastName: "User",
      }
      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
      return true
    }
    return false
  }

  const register = async (email: string, password: string, firstName: string, lastName: string): Promise<boolean> => {
    // Mock registration - will be replaced with WooCommerce API
    if (email && password.length >= 6) {
      const newUser = {
        id: Date.now().toString(),
        email,
        firstName,
        lastName,
      }
      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
      return true
    }
    return false
  }

  const loginWithGoogle = async (): Promise<boolean> => {
    if ((auth as any).isMock) {
      console.warn("Firebase is not configured. Google login disabled.")
      return false
    }
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      return true
    } catch (error) {
      console.error("Google login error", error)
      return false
    }
  }

  const loginWithGithub = async (): Promise<boolean> => {
    if ((auth as any).isMock) {
      console.warn("Firebase is not configured. Github login disabled.")
      return false
    }
    try {
      const provider = new GithubAuthProvider()
      await signInWithPopup(auth, provider)
      return true
    } catch (error) {
      console.error("Github login error", error)
      return false
    }
  }

  const loginWithPhone = async (phoneNumber: string, appVerifier: any): Promise<ConfirmationResult | null> => {
    if ((auth as any).isMock) {
      console.warn("Firebase is not configured. Phone login disabled.")
      return null
    }
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      return confirmationResult
    } catch (error) {
      console.error("Phone login error", error)
      return null
    }
  }

  const logout = async () => {
    setUser(null)
    localStorage.removeItem("user")
    if (!(auth as any).isMock) {
      try {
        await signOut(auth)
      } catch (error) {
        console.error("Error signing out of Firebase", error)
      }
    }
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        login, 
        register, 
        logout,
        loginWithGoogle,
        loginWithGithub,
        loginWithPhone
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
