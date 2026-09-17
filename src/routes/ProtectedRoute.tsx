import { Navigate, Outlet, useLocation } from 'react-router-dom'

export function ProtectedRoute() {
  const location = useLocation()
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
