import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from '../auth/ProtectedRoute'
import { LoginPage } from '../pages/LoginPage/LoginPage'
import { HomePage } from '../pages/HomePage/HomePage'
import { GamePage } from '../pages/GamePage/GamePage'
import { ResultPage } from '../pages/ResultPage/ResultPage'
import { Routes as AppRoutes } from '../utils'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.Login} element={<LoginPage />} />
        <Route path={AppRoutes.Home} element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path={AppRoutes.Game} element={<ProtectedRoute><GamePage /></ProtectedRoute>} />
        <Route path={AppRoutes.Result} element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to={AppRoutes.Home} replace />} />
      </Routes>
    </BrowserRouter>
  )
}
