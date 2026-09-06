import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../../components/ui/Button'
import { useAuth } from '../../context/AuthContext'
import './DashboardPage.css'

type DashboardPageProps = {
    profileType?: 'Student' | 'Tutor',
}

function DashboardPage({ profileType }: DashboardPageProps) {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const handleLogout = async () => {
        setIsLoggingOut(true)
        await logout()
        navigate('/login', { replace: true })
    }

    return (
        <main className="dashboard-page">
            <header className="dashboard-page__header">
                <div>
                    <span className="dashboard-page__eyebrow">Korkomat</span>
                    <h1>{profileType ? `${profileType} dashboard` : 'Welcome to the dashboard'}</h1>
                </div>
                <Button
                    variant="danger"
                    type="button"
                    disabled={isLoggingOut}
                    onClick={handleLogout}
                >
                    {isLoggingOut ? 'Signing out...' : 'Sign out'}
                </Button>
            </header>
        </main>
    )
}

export default DashboardPage