import { Navigate } from 'react-router-dom'
import { getToken, getUser } from '../services/authService'

const PublicRoute = ({ children }) => {
  const token = getToken()
  const user = getUser()

  // Nếu đã đăng nhập, redirect về app
  if (token && user) {
    return <Navigate to="/app/tasks" replace />
  }

  return children
}

export default PublicRoute
