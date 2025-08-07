import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export function PageIsolator({ children, pageName }) {
  const [isReady, setIsReady] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // Reset state when location changes
    setIsReady(false)
    
    // Small delay to ensure previous component is fully unmounted
    const timer = setTimeout(() => {
      setIsReady(true)
    }, 50)

    return () => {
      clearTimeout(timer)
      setIsReady(false)
    }
  }, [location.pathname])

  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Đang tải {pageName}...</p>
        </div>
      </div>
    )
  }

  return (
    <div key={location.pathname} className="w-full h-full">
      {children}
    </div>
  )
}
