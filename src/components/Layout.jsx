import { Outlet } from 'react-router'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

/**
 * Layout Component
 * Serves as the main page wrapper containing persistent Header and Footer.
 */
function Layout() {
  return (
    <>
      <Header />
      <main className="container">
        {/* Outlet dynamically renders child page route components */}
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
export default Layout
