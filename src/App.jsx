import { BrowserRouter, Routes, Route } from 'react-router'
import { CartProvider } from './context/CartProvider.jsx'
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import VendorPage from './pages/VendorPage.jsx'
import CartPage from './pages/CartPage.jsx'
import OrdersPage from './pages/OrdersPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

/**
 * App Component
 * Configures global Router provider, Cart Context Provider, and nested Route Table.
 */
export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          {/* Layout component wraps all child route pages */}
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="vendor/:id" element={<VendorPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="orders" element={<OrdersPage />} />
            {/* Catch-all 404 route for unmatched paths */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}