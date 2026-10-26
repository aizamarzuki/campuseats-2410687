import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import CartPage from './components/CartPage.jsx'
import Footer from './components/Footer.jsx'
import { Loading, ErrorMessage } from './components/Status.jsx'

function App() {
    const [vendors, setVendors] = useState([])
    const [selectedVendorId, setSelectedVendorId] = useState(vendors?.[0]?.id ?? null)
    const selectedVendor = vendors?.find((v) => v.id === selectedVendorId)

    const [cart, setCart] = useState([])
    const [view, setView] = useState('menu') // 'menu' | 'cart' | 'done'
    const [lastOrder, setLastOrder] = useState(null)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [reloadKey, setReloadKey] = useState(0)

    useEffect(() => {
  const controller = new AbortController()
  setLoading(true)
  setError(null)

  fetch('/api/vendors.json', { signal: controller.signal })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`)
      }
      return res.json()
    })
    .then((data) => {
      // Handle array or single vendor object cleanly
      const list = Array.isArray(data) ? data : [data]
      setVendors(list)
      if (list.length > 0) {
        setSelectedVendorId(list[0].id)
      }
      setLoading(false) // Explicitly clear loading state on success
    })
    .catch((err) => {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Failed to load vendors')
        setLoading(false) // Clear loading state on fetch error
      }
    })

  return () => controller.abort()
}, [reloadKey])

function handleAddToCart(item) {
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

function handleChangeQty(itemId, delta) {
    setCart((prevCart) =>
      prevCart
        .map((line) =>
          line.item.id === itemId ? { ...line, qty: line.qty + delta } : line
        )
        .filter((line) => line.qty > 0)
    )
  }

function handleRemove(itemId) {
    setCart((prevCart) => prevCart.filter((line) => line.item.id !== itemId))
  }
function handlePlaceOrder(details) {
    const total = cart.reduce((sum, item) => sum + item.price, 0)
    setLastOrder({ ...details, total })
    setCart([])
    setView('done')
}

const cartCount = cart.reduce((sum, line) => sum + line.qty, 0)

let content
if (view === 'cart') {
    content = (
        <CartPage 
            cart={cart}
            onChangeQty={handleChangeQty}
            onRemove={handleRemove}
            onPlaceOrder={handlePlaceOrder}
        />
 )
} else if (view === 'done') {
 content = <p>Order placed.</p> // TODO (B5): show pickup time and total
} else if (loading) {
 content = <Loading />
} else if (error) {
  content = (
    <ErrorMessage 
        message={error} 
        onRetry={() => setReloadKey((k) => k + 1)} 
    / >
  )
} else {
    // Default 'menu' view showing Vendors + Menu items
    content = (
      <>
        <section>
          <h2 className="section-title">Choose a vendor</h2>
          <div className="vendor-grid">
            {vendors?.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendorId}
                onSelect={setSelectedVendorId}
              />
            ))}
          </div>
        </section>

        {selectedVendor && (
          <section>
            <h2 className="section-title">Menu: {selectedVendor.name}</h2>
            <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />
          </section>
        )}
      </>
    )
  }
return (
 <>
 <Header cartCount={cartCount}
 onShowMenu={() => setView('menu')} onShowCart={() => setView('cart')} />
 <main className="container">{content}</main>
 <Footer />
 </>
)
}
export default App