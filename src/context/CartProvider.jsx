import { CartContext } from './cart-context.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

/**
 * CartProvider Component
 * Wraps the application to share cart items and order history globally.
 */
function CartProvider({ children }) {
  // Persist cart and orders state across page refreshes
  const [cart, setCart] = useLocalStorage('campuseats-cart', [])
  const [orders, setOrders] = useLocalStorage('campuseats-orders', [])

  // Derived values computed automatically on every cart change
  const count = cart.reduce((sum, line) => sum + line.qty, 0)
  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)

  // Add item or increment quantity if item already exists in cart
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

  // Adjust line item quantity; auto-removes item if quantity drops to 0
  function changeQty(itemId, delta) {
    setCart((prevCart) =>
      prevCart
        .map((line) =>
          line.item.id === itemId ? { ...line, qty: line.qty + delta } : line
        )
        .filter((line) => line.qty > 0)
    )
  }

  // Remove item completely from cart
  function removeFromCart(itemId) {
    setCart((prevCart) => prevCart.filter((line) => line.item.id !== itemId))
  }

  // Process checkout order: saves order to order history and clears cart
  function placeOrder(details) {
    const newOrder = {
      id: `ord-${Date.now()}`, // Unique timestamp ID
      ...details,
      items: [...cart],
      total,
      date: new Date().toLocaleString()
    }
    setOrders((prev) => [newOrder, ...prev])
    setCart([]) // Reset cart state to empty
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
export default CartProvider