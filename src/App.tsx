import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

const Home        = lazy(() => import('./pages/Home'))
const Referenzen  = lazy(() => import('./pages/Referenzen'))
const Rechner     = lazy(() => import('./pages/Rechner'))
const Impressum   = lazy(() => import('./pages/Impressum'))
const Datenschutz = lazy(() => import('./pages/Datenschutz'))
const NotFound    = lazy(() => import('./pages/NotFound'))
const PVAnlage    = lazy(() => import('./pages/PVAnlage'))
const Waermepumpe = lazy(() => import('./pages/Waermepumpe'))
const Notstrom    = lazy(() => import('./pages/Notstrom'))
const Wallbox     = lazy(() => import('./pages/Wallbox'))

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<div style={{ background: '#f8f7f5', minHeight: '100vh' }} />}>
        <Routes>
          <Route path="/"                       element={<Home />} />
          <Route path="/referenzen"             element={<Referenzen />} />
          <Route path="/rechner"                element={<Rechner />} />
          <Route path="/impressum"              element={<Impressum />} />
          <Route path="/datenschutz"            element={<Datenschutz />} />
          <Route path="/produkte/pv-anlage"     element={<PVAnlage />} />
          <Route path="/produkte/waermepumpe"   element={<Waermepumpe />} />
          <Route path="/produkte/notstrom"      element={<Notstrom />} />
          <Route path="/produkte/wallbox"       element={<Wallbox />} />
          <Route path="*"                       element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
