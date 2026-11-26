import { NavLink, useNavigate } from 'react-router'
import { useCart } from '../hooks/useCart.js'
import { useAuth } from '../hooks/useAuth.js'

function Header() {
  const { count } = useCart()
  const navigate = useNavigate()
  const { user, role, logout } = useAuth()



  async function handleLogout() {
    await logout()
    navigate('/')
  }

  return (
    <header className="header">
      <h1 className="logo">CampusEats</h1>
      <nav className="nav">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'link active' : 'link')}>
          Vendors
        </NavLink>
        <NavLink to="/orders" className={({ isActive }) => (isActive ? 'link active' : 'link')}>
          My Orders
        </NavLink>
        <NavLink to="/cart" className={({ isActive }) => (isActive ? 'link cart active' : 'link cart')}>
          Cart <span className="badge">{count}</span>
        </NavLink>
        {user ? (
          <>
            <span className="user-name">Hi, {user.displayName || user.email}</span>
            <button type="button" className="link" onClick={handleLogout}>Log out</button>
          </>
        ) : (
          <NavLink to="/login" className={({ isActive }) => (isActive ? 'link active' : 'link')}>
            Log in
          </NavLink>
        )}
        {role === 'vendor' && <NavLink to="/dashboard">Dashboard</NavLink>}
        {role === 'admin' && <NavLink to="/admin">Admin</NavLink>}
        {role === 'student' && <NavLink to="/become-vendor">Sell food</NavLink>}
      </nav>
    </header>
  )
}
export default Header