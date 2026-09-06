import { Navigate, Route, Routes } from 'react-router-dom'

import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import ProfileSelection from '../pages/common/ProfileSelectionPage'
import DashboardPage from '../pages/common/DashboardPage'

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route path="/login" element={
                <PublicRoute>
                    <LoginPage />
                </PublicRoute>
                } />
                
            <Route path="/register" element={
                <PublicRoute>
                    <RegisterPage />
                </PublicRoute>
                } />

            <Route path="/register/student" element={
                <ProtectedRoute>
                    <RegisterPage />
                </ProtectedRoute>
                } />

            <Route path="/register/tutor" element={
                <ProtectedRoute>
                    <RegisterPage />
                </ProtectedRoute>
                } />

            <Route path="/forgot-password" element={
                <PublicRoute>
                    <ForgotPasswordPage />
                </PublicRoute>
                }/>

            <Route path="/select-profile" element={
                <ProtectedRoute>
                    <ProfileSelection />
                </ProtectedRoute>
                }
            />

            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <DashboardPage />
                </ProtectedRoute>
                }
            />

            <Route path="/student/dashboard" element={
                <ProtectedRoute>
                    <DashboardPage profileType="Student" />
                </ProtectedRoute>
                }
            />

            <Route path="/tutor/dashboard" element={
                <ProtectedRoute>
                    <DashboardPage profileType="Tutor" />
                </ProtectedRoute>
                }
            />
        </Routes>
    )
}

export default AppRouter