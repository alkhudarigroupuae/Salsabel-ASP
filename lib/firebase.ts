import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase
let app: FirebaseApp
let auth: Auth

if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  console.warn("Firebase credentials missing. Auth disabled.")
  // Mock auth object to prevent crashes
  auth = {
    currentUser: null,
    onAuthStateChanged: (cb: any) => {
      // immediately call back with null to indicate no user
      cb(null)
      return () => {} // unsubscribe function
    },
    signOut: async () => {},
    // Add other methods as needed to prevent crashes
  } as unknown as Auth
  // Mark as mock for consumers to check
  ;(auth as any).isMock = true
} else {
  try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
    auth = getAuth(app)
  } catch (error) {
    console.error("Firebase init failed", error)
    // Fallback mock
    auth = {
      currentUser: null,
      onAuthStateChanged: (cb: any) => {
        cb(null)
        return () => {}
      },
    } as unknown as Auth
    ;(auth as any).isMock = true
  }
}

export { auth }
