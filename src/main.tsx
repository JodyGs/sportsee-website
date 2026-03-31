import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/user/:id" element={<App />} />
        <Route path="*" element={<Navigate to="/user/12" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
