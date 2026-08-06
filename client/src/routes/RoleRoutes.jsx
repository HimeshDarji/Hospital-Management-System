import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function RoleRoutes({ allowedRoles }) {
  const { user } = useAuth()
  return allowedRoles.includes(user?.role) ? <Outlet /> : <Navigate to="/" replace />
}

export default RoleRoutes
