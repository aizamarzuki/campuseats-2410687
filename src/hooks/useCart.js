import { useContext } from 'react'
import { CartContext } from '../context/cart-context.js'

/**
 * Custom Hook: useCart
 * Must have the 'export' keyword before 'function useCart()'
 */
export function useCart() {
  const context = useContext(CartContext)

  // Guard clause: ensures useCart is called inside a CartProvider boundary
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}