import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

// Hook để cleanup state khi component unmount hoặc route change
export function useCleanupOnRouteChange(cleanupCallback) {
  const location = useLocation()
  const previousPath = useRef(location.pathname)

  useEffect(() => {
    if (previousPath.current !== location.pathname) {
      if (cleanupCallback && typeof cleanupCallback === 'function') {
        cleanupCallback()
      }
      previousPath.current = location.pathname
    }
  }, [location.pathname, cleanupCallback])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (cleanupCallback && typeof cleanupCallback === 'function') {
        cleanupCallback()
      }
    }
  }, [cleanupCallback])
}

// Hook để reset tất cả local state khi route change
export function useResetStateOnRouteChange(initialState, setters = []) {
  const location = useLocation()
  const previousPath = useRef(location.pathname)

  useEffect(() => {
    if (previousPath.current !== location.pathname) {
      // Reset all state values to initial
      if (Array.isArray(setters)) {
        setters.forEach((setter, index) => {
          if (typeof setter === 'function') {
            const value = Array.isArray(initialState) ? initialState[index] : initialState
            setter(value)
          }
        })
      }
      previousPath.current = location.pathname
    }
  }, [location.pathname, initialState, setters])
}
