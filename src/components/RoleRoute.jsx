import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'
import { Loading } from './Status.jsx'

function RoleRoute({ roles }) {
  const { user, role, loading } = useAuth()

  if (loading) return <Loading />
  if (!user) return <Navigate to="/login" replace />
  if (!roles.includes(role)) {
    return <p>This page is for {roles.join(' or ')} accounts.</p>
  }

  return <Outlet />
}
export default RoleRoute