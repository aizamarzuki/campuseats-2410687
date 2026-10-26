import { useState } from 'react'
import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import Footer from './components/Footer.jsx'
import vendors from '../public/api/vendors.json'
import { Loading, ErrorMessage } from './components/Status.jsx'
function App() {
const [selectedVendorId, setSelectedVendorId] = useState(vendors[0].id)
const selectedVendor = vendors.find((v) => v.id === selectedVendorId)
const [cart, setCart] = useState([])
const [view, setView] = useState('menu') // 'menu' | 'cart' | 'done'
const [lastOrder, setLastOrder] = useState(null)
function handlePlaceOrder(details) {
 const total = 0 // TODO: same reduce as CartPage
 setLastOrder({ ...details, total })
 setCart([])
 setView('done')
}
const cartCount = 0 // TODO: total quantity, with cart.reduce(...)
let content
if (view === 'cart') {
 content = (
 <CartPage cart={cart} onChangeQty={handleChangeQty}
 onRemove={handleRemove} onPlaceOrder={handlePlaceOrder} />
 )
} else if (view === 'done') {
 content = <p>Order placed.</p> // TODO (B5): show pickup time and total
} else if (loading) {
 content = <Loading />
} else if (error) {
 content = <ErrorMessage message={error} onRetry={() => setReloadKey((k) => k + 
1)} />
} else {
 content = <>{/* TODO: your Week 2 vendor cards + MenuList go here */}</>
}
return (
 <>
 <Header cartCount={cartCount}
 onShowMenu={() => setView('menu')} onShowCart={() => setView('cart')} />
 <main className="container">{content}</main>
 <Footer />
 </>
)
function handlePlaceOrder(details) {
 const total = 0 // TODO: same reduce as CartPage
 setLastOrder({ ...details, total })
 setCart([])
 setView('done')
}
function handleAddToCart(item) {
setCart((prevCart) => [...prevCart, item]) // a NEW array, never cart.push()
}
 return (
 <>
 <Header cartCount={cart.length} />
 <main className="container">
 <section>
 <h2 className="section-title">Choose a vendor</h2>
 <div className="vendor-grid">
 {vendors.map((vendor) => (
 <VendorCard
 key={vendor.id}
 vendor={vendor}
 isSelected={vendor.id === selectedVendorId}
 onSelect={setSelectedVendorId}
 />
 ))}
 </div>
 </section>
 <section>
 <h2 className="section-title">Menu: {selectedVendor.name}</h2>
 <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />
 </section>
 </main>
 <Footer />
 </>
 )
}
export default App
