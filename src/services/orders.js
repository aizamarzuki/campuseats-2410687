import {
  collection,
  doc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
  writeBatch,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '../firebase.js'

// Create: Batch write one order per vendor in cart
export async function placeOrders(user, cart, details) {
  const byVendor = new Map()
  for (const line of cart) {
    const lines = byVendor.get(line.item.vendorId) ?? []
    byVendor.set(line.item.vendorId, [...lines, line])
  }

  const batch = writeBatch(db)
  for (const [vendorId, lines] of byVendor) {
    const ref = doc(collection(db, 'orders'))
    batch.set(ref, {
      studentUid: user.uid,
      studentName: details.name,
      mahallah: details.mahallah,
      pickupTime: details.pickupTime,
      vendorId,
      vendorName: lines[0].item.vendorName || 'Campus Vendor',
      // Digit 7 Personal Feature: Include `note` on every item in Firestore
      items: lines.map(({ item, qty, note = '' }) => ({
        itemId: item.id,
        name: item.name,
        price: item.price,
        qty,
        note,
      })),
      total: lines.reduce((sum, { item, qty }) => sum + item.price * qty, 0),
      status: 'Received',
      createdAt: serverTimestamp(),
    })
  }
  await batch.commit()
}

// Read live: Subscribe to current student's orders
export function subscribeToMyOrders(uid, onData, onError) {
  // TODO 3: Query orders matching studentUid
  const q = query(collection(db, 'orders'), where('studentUid', '==', uid))

  return onSnapshot(
    q,
    (snapshot) => {
      const orders = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
      orders.sort(
        (a, b) =>
          (b.createdAt?.toMillis?.() ?? Date.now()) -
          (a.createdAt?.toMillis?.() ?? Date.now())
      )
      onData(orders)
    },
    onError
  )
}

// Update: Change pickup time
export function changePickupTime(orderId, pickupTime) {
  return updateDoc(doc(db, 'orders', orderId), { pickupTime })
}

// Delete: Cancel order (TODO 5)
export function cancelOrder(orderId) {
  return deleteDoc(doc(db, 'orders', orderId))
}

export const STATUSES = ['Received', 'Preparing', 'Ready', 'Collected']

// Inside placeOrders -> batch.set(ref, { ... }):
// Add this field:
// vendorOwnerUid: lines[0].item.vendorOwnerUid ?? null,

export function subscribeToVendorOrders(ownerUid, onData, onError) {
  const q = query(collection(db, 'orders'), where('vendorOwnerUid', '==', ownerUid))
  return onSnapshot(q, (s) => onData(s.docs.map((d) => ({ id: d.id, ...d.data() }))), onError)
}

export const updateOrderStatus = (orderId, status) =>
  updateDoc(doc(db, 'orders', orderId), { status })