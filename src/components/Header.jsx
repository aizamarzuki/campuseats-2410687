import { NavLink, useNavigate } from 'react-router'
import { useCart } from '../hooks/useCart.js'
import { useAuth } from '../hooks/useAuth.js'

export default function Header() {
  const { count } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

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
      </nav>
    </header>
  )
}