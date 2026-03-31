import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './index.css'

import HomePage from './pages/HomePage.jsx'
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage.jsx'))

// In dev → basename="/"  |  In build → basename="/riscaldamento-pavimento"
const basePath = import.meta.env.VITE_BASE_PATH?.replace(/\/$/, '') || '/'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter basename={basePath}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="privacy-policy" element={<Suspense fallback={<div className="min-h-screen" />}><PrivacyPolicyPage /></Suspense>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)