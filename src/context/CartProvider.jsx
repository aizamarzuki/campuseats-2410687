import { CartContext } from './cart-context.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

/**
 * Context Provider Component: CartProvider
 * Wraps child components and supplies global state (cart, order history) 
 * alongside actions to modify cart items and complete orders.
 * 
 * @param {ReactNode} children - Dynamic child components wrapped inside <CartProvider>
 */
export function CartProvider({ children }) {
  // 1. Persistent State: Custom hooks load and persist state in browser localStorage
  const [cart, setCart] = useLocalStorage('campuseats-cart', [])
  const [orders, setOrders] = useLocalStorage('campuseats-orders', [])

  // 2. Derived State: Recalculated dynamically on every render cycle without extra useState
  // Calculates total number of items in the cart (sums up line.qty)
  const count = cart.reduce((sum, line) => sum + line.qty, 0)

  // Calculates total monetary amount for the cart (sums up line.item.price * line.qty)
  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)

  /**
   * Action: Add item to cart or increment quantity if already present
   * @param {Object} item - Menu item object being added
   */
  function addToCart(item) {
    // Uses functional state update pattern (prevCart) to avoid stale closures
    setCart((prevCart) => {
      const existingLine = prevCart.find((line) => line.item.id === item.id)
      
      if (existingLine) {
        // Return a NEW array with updated item quantity (immutable state update)
        return prevCart.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line
        )
      }
      
      // If item is new, append it as a new line object with initial qty = 1
      return [...prevCart, { item, qty: 1 }]
    })
  }

  /**
   * Action: Adjust item quantity (+1 or -1)
   * Automatically removes items whose quantity drops to 0 or below.
   * 
   * @param {string|number} itemId - Target menu item ID
   * @param {number} delta - Amount to adjust (+1 or -1)
   */
  function changeQty(itemId, delta) {
    setCart((prevCart) =>
      prevCart
        .map((line) =>
          line.item.id === itemId ? { ...line, qty: line.qty + delta } : line
        )
        // Chained .filter() automatically prunes out lines where qty becomes <= 0
        .filter((line) => line.qty > 0)
    )
  }

  /**
   * Action: Delete item line completely from cart
   * @param {string|number} itemId - Target menu item ID to remove
   */
  function removeFromCart(itemId) {
    setCart((prevCart) => prevCart.filter((line) => line.item.id !== itemId))
  }

  /**
   * Action: Submit checkout details, create order record, and reset cart
   * @param {Object} details - Customer checkout form values { name, mahallah, pickupTime }
   */
  function placeOrder(details) {
    const newOrder = {
      id: `ord-${Date.now()}`,       // Generates a unique order ID string using current timestamp
      ...details,                     // Spreads name, mahallah, pickupTime properties
      items: [...cart],               // Creates a snapshot copy of current cart items
      total,                          // Snapshot of current total price
      date: new Date().toLocaleString() // Formatted human-readable timestamp
    }
    
    // Prepend new order to order history list (newest first)
    setOrders((prev) => [newOrder, ...prev])
    
    // Clear active cart state
    setCart([])
  }

  return (
    /* 
      Exposes state values and handler functions to any nested tree component 
      that calls useCart() / useContext(CartContext)
    */
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