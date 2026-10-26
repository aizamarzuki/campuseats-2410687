const [view, setView] = useState('menu') // 'menu' | 'cart' | 'done'
const cartCount = 0 // TODO: total quantity, with cart.reduce(...)
const [lastOrder, setLastOrder] = useState(null)
function handlePlaceOrder(details) {
 const total = 0 // TODO: same reduce as CartPage
 setLastOrder({ ...details, total })
 setCart([])
 setView('done')
}
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