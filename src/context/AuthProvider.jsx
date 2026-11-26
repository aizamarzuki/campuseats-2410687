import { useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth'
import { auth } from '../firebase.js'
import { AuthContext } from './auth-context.js'
import { ensureUserProfile, subscribeToProfile } from '../services/users.js'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let stopProfile = () => {}
    const stopAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      stopProfile()
      setUser(firebaseUser)
      if (!firebaseUser) {
        setProfile(null)
        setLoading(false)
        return
      }
      setLoading(true)
      try {
        await ensureUserProfile(firebaseUser)
      } catch (err) {
        console.error(err)
      }
      stopProfile = subscribeToProfile(
        firebaseUser.uid,
        (p) => {
          setProfile(p)
          setLoading(false)
        },
        () => setLoading(false)
      )
    })

    return () => {
      stopAuth()
      stopProfile()
    }
  }, [])

  async function register(name, email, password) {
    const credential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(credential.user, { displayName: name })
    await ensureUserProfile(credential.user, name)
    setUser({ ...credential.user, displayName: name })
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function loginWithGoogle() {
    return signInWithPopup(auth, new GoogleAuthProvider())
  }

  function logout() {
    return signOut(auth)
  }

  const role = profile?.role ?? null
  const value = { user, profile, role, loading, register, login, loginWithGoogle, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}