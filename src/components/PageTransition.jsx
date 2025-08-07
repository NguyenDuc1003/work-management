import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export function usePageTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [currentPath, setCurrentPath] = useState('')
  const location = useLocation()
  const timeoutRef = useRef(null)

  useEffect(() => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Only transition if path actually changed
    if (location.pathname !== currentPath) {
      setIsTransitioning(true)
      
      timeoutRef.current = setTimeout(() => {
        setCurrentPath(location.pathname)
        setIsTransitioning(false)
      }, 200) // Longer transition time for proper cleanup
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [location.pathname, currentPath])

  return { isTransitioning, currentPath }
}

export function PageTransition({ children }) {
  const { isTransitioning, currentPath } = usePageTransition()
  const location = useLocation()

  // Show loading during transition or if paths don't match
  if (isTransitioning || location.pathname !== currentPath) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Đang tải...</p>
        </div>
      </div>
    )
  }

  return children
}
