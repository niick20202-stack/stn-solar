import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Home        = lazy(() => import('./pages/Home'))
const Referenzen  = lazy(() => import('./pages/Referenzen'))
const Rechner     = lazy(() => import('./pages/Rechner'))
const Impressum   = lazy(() => import('./pages/Impressum'))
const Datenschutz = lazy(() => import('./pages/Datenschutz'))
const NotFound    = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ background: '#131313', minHeight: '100vh' }} />}>
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/referenzen"  element={<Referenzen />} />
          <Route path="/rechner"     element={<Rechner />} />
          <Route path="/impressum"   element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="*"            element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
