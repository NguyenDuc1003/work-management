import { Navigate, useLocation } from 'react-router-dom'
import { getToken, getUser } from '../services/authService'

const ProtectedRoute = ({ children }) => {
  const location = useLocation()
  const token = getToken()
  const user = getUser()

  // Kiểm tra xem người dùng đã đăng nhập chưa
  if (!token || !user) {
    // Lưu lại đường dẫn hiện tại để redirect sau khi đăng nhập
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute
