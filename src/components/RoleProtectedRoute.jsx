import { Navigate } from 'react-router-dom'
import { hasPermission } from '../services/authService'
import UnauthorizedPage from '../pages/UnauthorizedPage'

const RoleProtectedRoute = ({ children, requiredPermission, showUnauthorizedPage = true }) => {
  // Kiểm tra quyền hạn
  if (requiredPermission && !hasPermission(requiredPermission)) {
    if (showUnauthorizedPage) {
      return <UnauthorizedPage />
    }
    return <Navigate to="/app/tasks" replace />
  }

  return children
}

export default RoleProtectedRoute
