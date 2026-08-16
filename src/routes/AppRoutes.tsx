import { Navigate, Route, Routes } from 'react-router-dom'
import { usuarioController } from '../controllers/usuarioController'
import HomeView from '../views/HomeView'
import LoginView from '../views/LoginView'
import FuncionariosView from '../views/FuncionariosView'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!usuarioController.isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginView />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomeView />
          </ProtectedRoute>
        }
      />

      <Route
        path="/funcionarios"
        element={
          <ProtectedRoute>
            <FuncionariosView />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={<Navigate to={usuarioController.isAuthenticated() ? '/home' : '/login'} replace />}
      />
    </Routes>
  )
}
