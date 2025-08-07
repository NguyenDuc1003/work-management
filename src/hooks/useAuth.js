import { useState, useEffect } from 'react'
import { getToken, getUser } from '../services/authService'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const token = getToken()
      const userData = getUser()
      
      if (token && userData) {
        setIsAuthenticated(true)
        setUser(userData)
      } else {
        setIsAuthenticated(false)
        setUser(null)
      }
      
      setLoading(false)
    }

    checkAuth()

    // Listen for storage changes (useful for logout from another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'token' || e.key === 'user') {
        checkAuth()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return {
    isAuthenticated,
    user,
    loading
  }
}

export default useAuth
