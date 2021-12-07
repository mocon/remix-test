import { useState, useEffect, createContext, useContext, FC } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'

type ContextState = { user: User | null }

const apiKey = process.env.FIREBASE_API_KEY

const firebaseConfig = {
  apiKey,
  authDomain: 'remix-auth-test.firebaseapp.com',
  projectId: 'remix-auth-test',
  storageBucket: 'remix-auth-test.appspot.com',
  messagingSenderId: '119923457763',
  appId: '1:119923457763:web:66ad9f2cce0d8a901b8fd6',
}

export const initFirebase = () => initializeApp(firebaseConfig)

export const FirebaseAuthContext = createContext<ContextState | undefined>(undefined)

export const FirebaseAuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const value = { user }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), setUser)
    return unsubscribe
  }, [])

  return (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  )
}

export function useFirebaseAuth() {
  const context = useContext(FirebaseAuthContext)
  const errorMessage = 'useFirebaseAuth must be called within FirebaseAuthProvider'

  if (context === undefined) throw new Error(errorMessage)
  
  return context.user
}
