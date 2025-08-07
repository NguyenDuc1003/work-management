import React from 'react'
import ReactDOM from 'react-dom/client'
import './suppressWarnings.js'
import RouterWrapper from './components/RouterWrapper.jsx'
import { ThemeProvider } from './components/theme-provider'
import ErrorBoundary from './components/ErrorBoundary'
import './globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <RouterWrapper />
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
