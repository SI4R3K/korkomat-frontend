import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChartBarIcon } from '@heroicons/react/24/outline'

import { useAuth } from '../../context/AuthContext'
import MakeSidebar from '../../components/ui/sidebar/Sidebar'
import HeaderComponent from '../../components/ui/header/HeaderComponent'

type DashboardPageProps = {
    profileType?: 'Student' | 'Tutor',
}

function DashboardPage({ profileType }: DashboardPageProps) {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const [sidebarExpanded, setSidebarExpanded] = useState(true)

    const handleLogout = async () => {
        setIsLoggingOut(true)
        await logout()
        navigate('/login', { replace: true })
    }

    return (
        <main className="min-h-screen bg-[var(--color-background)]">
            <MakeSidebar profileType={profileType || 'Student'} expanded={sidebarExpanded} setExpanded={setSidebarExpanded} onLogout={handleLogout} isLoggingOut={isLoggingOut} />
            <section className={`min-h-screen pl-0 transition-all ${sidebarExpanded ? 'sm:pl-[280px]' : 'sm:pl-[84px]'}`}>
                <div className="mx-auto max-w-[1200px] px-5 py-6 sm:px-10 sm:py-10">
                    <HeaderComponent
                        profileType={profileType}
                        title='workspace'
                        subtitle={profileType ? `${profileType} dashboard` : 'Welcome to the dashboard'}
                        subsubtitle={profileType === 'Tutor'
                            ? 'Keep your teaching schedule and student relationships moving forward.'
                            : 'Find the right learning rhythm and make every lesson count.'}
                        className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[0_8px_24px_rgb(25_43_58/8%)] sm:p-8 md:flex-row md:items-start"
                        icon={<ChartBarIcon className="hidden size-10 text-[var(--color-primary)] md:block" />}
                    />
                    <div className="mt-6 grid gap-5 md:grid-cols-3">
                        {['Upcoming sessions', 'Active conversations', 'Weekly progress'].map((label, index) => (
                            <article key={label} className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[0_8px_24px_rgb(25_43_58/5%)]">
                                <p className="m-0 text-sm font-bold text-[var(--color-text-secondary)]">{label}</p>
                                <p className="mb-0 mt-4 text-3xl font-black text-[var(--color-text-primary)]">{index === 0 ? '0' : '--'}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default DashboardPage