import { CartContext } from './cart-context.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

/**
 * CartProvider Component
 * Notice the 'export' keyword before 'function CartProvider'
 */
export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('campuseats-cart', [])
  const [orders, setOrders] = useLocalStorage('campuseats-orders', [])

  const count = cart.reduce((sum, line) => sum + line.qty, 0)
  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)

  function addToCart(item) {
    setCart((prevCart) => {
      const existingLine = prevCart.find((line) => line.item.id === item.id)
      if (existingLine) {
        return prevCart.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line
        )
      }
      return [...prevCart, { item, qty: 1 }]
    })
  }

  function changeQty(itemId, delta) {
    setCart((prevCart) =>
      prevCart
        .map((line) =>
          line.item.id === itemId ? { ...line, qty: line.qty + delta } : line
        )
        .filter((line) => line.qty > 0)
    )
  }

  function removeFromCart(itemId) {
    setCart((prevCart) => prevCart.filter((line) => line.item.id !== itemId))
  }

  function placeOrder(details) {
    const newOrder = {
      id: `ord-${Date.now()}`,
      ...details,
      items: [...cart],
      total,
      date: new Date().toLocaleString()
    }
    setOrders((prev) => [newOrder, ...prev])
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        count,
        total,
        addToCart,
        changeQty,
        removeFromCart,
        placeOrder
      }}
    >
      {children}
    </CartContext.Provider>
  )
}