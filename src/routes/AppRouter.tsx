import { Navigate, Route, Routes } from 'react-router-dom'

import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage'
import RestPasswordPage from '../pages/auth/RestPasswordPage'
import ConfirmEmailPage from '../pages/auth/ConfirmEmailPage'
import EmailConfirmationPage from '../pages/auth/EmailConfirmationPage'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import ProfileSelection from '../pages/common/ProfileSelectionPage'
import DashboardPage from '../pages/common/DashboardPage'
import AvailableSlotPage from '../pages/student/AvailableSlotsPage'
import AvailabilityPage from '../pages/tutor/AvailabilityPage'
import MySubjectsPage from '../pages/tutor/MySubjectsPage'
import TutorLessonsPage from '../pages/tutor/TutorLessonsPage'
import StudentLessonsPage from '../pages/student/StudentLessonsPage'

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/auth/login" replace />} />

            <Route path="/auth/login" element={
                <PublicRoute>
                    <LoginPage />
                </PublicRoute>
                } />

            <Route path="/auth/check-email" element={
                <EmailConfirmationPage />
                } />
                
            <Route path="/auth/register" element={
                <PublicRoute>
                    <RegisterPage />
                </PublicRoute>
                } />

            <Route path="/auth/register/student" element={
                <ProtectedRoute>
                    <RegisterPage />
                </ProtectedRoute>
                } />

            <Route path="/auth/register/tutor" element={
                <ProtectedRoute>
                    <RegisterPage />
                </ProtectedRoute>
                } />

            <Route path="/auth/forgot-password" element={
                <PublicRoute>
                    <ForgotPasswordPage />
                </PublicRoute>
                }/>

            <Route path="/auth/reset-password" element={
                <PublicRoute>
                    <RestPasswordPage />
                </PublicRoute>
                }/>

            <Route path="/auth/verify" element={
                <PublicRoute>
                    <ConfirmEmailPage />
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

            <Route path="/student/available-slots" element={
                <ProtectedRoute>
                    <AvailableSlotPage profileType="Student" />
                </ProtectedRoute>
                } 
            />

            <Route path="/tutor/dashboard" element={
                <ProtectedRoute>
                    <DashboardPage profileType="Tutor" />
                </ProtectedRoute>
                }
            />

            <Route path="/tutor/availability" element={
                <ProtectedRoute>
                    <AvailabilityPage />
                </ProtectedRoute>
                }
            />

            <Route path="/tutor/my-subjects" element={
                <ProtectedRoute>
                    <MySubjectsPage />
                </ProtectedRoute>
            }
            />

            <Route path="/tutor/my-lessons" element={
                <ProtectedRoute>
                    <TutorLessonsPage/>      
                </ProtectedRoute>
            }
            />

            <Route path="/student/my-lessons" element={
                <ProtectedRoute>
                    <StudentLessonsPage/>
                </ProtectedRoute>
            }
            />
        </Routes>
    )
}

export default AppRouter