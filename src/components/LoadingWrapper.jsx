import { useState, useEffect } from 'react'

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
)

export function withLoading(WrappedComponent, componentName = 'Component') {
  return function LoadingComponent(props) {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
      // Simulate loading time for smooth transitions
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 100)

      return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
      const handleError = (error) => {
        console.error(`Error in ${componentName}:`, error)
        setError(error.message)
        setIsLoading(false)
      }

      window.addEventListener('error', handleError)
      return () => window.removeEventListener('error', handleError)
    }, [])

    if (error) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-2">
              Lỗi tải {componentName}
            </h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => {
                setError(null)
                setIsLoading(true)
                setTimeout(() => setIsLoading(false), 100)
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Thử lại
            </button>
          </div>
        </div>
      )
    }

    if (isLoading) {
      return <LoadingSpinner />
    }

    return <WrappedComponent {...props} />
  }
}

export default LoadingSpinner
