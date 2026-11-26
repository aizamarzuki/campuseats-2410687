import { doc, getDoc, setDoc, updateDoc, onSnapshot, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.js'

export async function ensureUserProfile(user, name) {
  const ref = doc(db, 'users', user.uid)
  const snap = await getDoc(ref)
  if (!snap.exists()) {
    await setDoc(ref, {
      name: name ?? user.displayName ?? '',
      email: user.email,
      role: 'student',
      createdAt: serverTimestamp(),
    })
  } else if (name && !snap.data().name) {
    await updateDoc(ref, { name })
  }
}

export function subscribeToProfile(uid, onData, onError) {
  return onSnapshot(
    doc(db, 'users', uid),
    (snap) => onData(snap.exists() ? snap.data() : null),
    onError
  )
}