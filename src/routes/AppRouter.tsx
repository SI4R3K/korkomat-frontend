import { Route, Routes } from 'react-router-dom'

import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import ProfileSelection from '../pages/common/ProfileSelectionPage'

function AppRouter() {
    return (
        <Routes>
            <Route path="/login" element={
                <PublicRoute>
                    <LoginPage />
                </PublicRoute>
                } />
                
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />}/>

            <Route path="/select-profile" element={
                <ProtectedRoute>
                    <ProfileSelection />
                </ProtectedRoute>
                }
            />
        </Routes>
    )
}

export default AppRouter