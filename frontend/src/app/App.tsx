import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../features/auth/model/AuthContext'
import { ProtectedRoute } from './ProtectedRoute'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { RegisterBarbershopPage } from '../pages/RegisterBarbershopPage'
import { RecoverPasswordPage } from '../pages/RecoverPasswordPage'
import { ResetPasswordPage } from '../pages/ResetPasswordPage'
import { DashboardPage } from '../pages/DashboardPage'
import { BarbershopsPage } from '../pages/BarbershopsPage'
import { BarbershopDetailPage } from '../pages/BarbershopDetailPage'
import { OwnerBarbershopsPage } from '../pages/OwnerBarbershopsPage'
import { OwnerBarbershopDetailPage } from '../pages/OwnerBarbershopDetailPage'
import { OwnerProfessionalsPage } from '../pages/OwnerProfessionalsPage'
import { OwnerServicesPage } from '../pages/OwnerServicesPage'
import { NewAppointmentPage } from '../pages/NewAppointmentPage'
import { AppointmentsPage } from '../pages/AppointmentsPage'
import { ProfessionalSchedulePage } from '../pages/ProfessionalSchedulePage'
import { UnavailabilityPage } from '../pages/UnavailabilityPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/register-barbershop" element={<RegisterBarbershopPage />} />
          <Route path="/recover-password" element={<RecoverPasswordPage />} />
          {/* /redefinir-senha é o link real enviado por e-mail (SolicitarRecuperacaoSenhaUseCase);
              /reset-password fica como alias por consistência com o roadmap. */}
          <Route path="/redefinir-senha" element={<ResetPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/barbershops"
            element={
              <ProtectedRoute>
                <BarbershopsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/barbershops/:id"
            element={
              <ProtectedRoute>
                <BarbershopDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/owner/barbershops"
            element={
              <ProtectedRoute>
                <OwnerBarbershopsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/owner/barbershops/:id"
            element={
              <ProtectedRoute>
                <OwnerBarbershopDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/owner/barbershops/:id/professionals"
            element={
              <ProtectedRoute>
                <OwnerProfessionalsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/owner/barbershops/:id/services"
            element={
              <ProtectedRoute>
                <OwnerServicesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments/new"
            element={
              <ProtectedRoute>
                <NewAppointmentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <AppointmentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/professional/schedule"
            element={
              <ProtectedRoute allowedRoles={['profissional']}>
                <ProfessionalSchedulePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/professional/unavailability"
            element={
              <ProtectedRoute allowedRoles={['profissional']}>
                <UnavailabilityPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
