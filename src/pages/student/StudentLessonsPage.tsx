import { useEffect, useState } from "react"
import HeaderComponent from "../../components/ui/header/HeaderComponent"
import { useNavigate } from "react-router-dom"
import MakeSidebar from "../../components/ui/sidebar/Sidebar"
import { useAuth } from "../../context/AuthContext"
import type { StudentLesson } from "../../types/lesson"
import { studentGetLessons } from "../../api/lessonApi"
import EmptyState from "../../components/ui/EmptyState"
import LessonList from "../../components/ui/lesson/LessonList"

function StudentLessonsPage() {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const [sidebarExpanded, setSidebarExpanded] = useState(true)
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const [lessons, setLessons] = useState<StudentLesson[]>([])
    const [isLoadingLessons, setIsLoadingLessons] = useState(true)
    const [lessonsError, setLessonsError] = useState('')

    const handleLogout = async () => {
        setIsLoggingOut(true)
        await logout()
        navigate('/login', {replace: true})
    }

    const loadLessons = async () => {
        try {
            setLessonsError('')
            const response = await studentGetLessons('CONFIRMED')
            setLessons(response.data.lessons)
        } catch (error) {
            setLessonsError(error instanceof Error ? error.message : 'Could not load lessons.')
        } finally {
            setIsLoadingLessons(false)
        }
    }

    useEffect(() => {
        void loadLessons()
    }, [])

    return (
        <main className="theme-student min-h-screen bg-[var(--color-background)]">
            <MakeSidebar
                profileType="Student"
                expanded={sidebarExpanded}
                setExpanded={setSidebarExpanded}
                onLogout={handleLogout}
                isLoggingOut={isLoggingOut}
            />
            <section className={`min-h-screen pl-0 transition-all ${sidebarExpanded ? 'sm:pl-[280px]' : 'sm:pl-[84px]'}`}>
                <div className="mx-auto max-w-[1200px] px-5 py-6 sm:px-10 sm:py-10">
                    <HeaderComponent
                        profileType='Student'
                        title='workspace'
                        subtitle='View your lessons.'
                        subsubtitle='View your upcomming lessons. Reschedule if needed.' 
                    />
                    <div className="mb-4 mt-8 flex items-center justify-between gap-4">
                        <h2 className="m-0 text-xl font-bold text-[var(--color-text-primary)]">Upcoming lessons</h2>
                    </div>
                    {isLoadingLessons ? (
                        <div className="rounded-2xl border border-[var(--color-border)] bg-white px-6 py-12 text-center" role="status">
                            <p className="m-0 text-sm text-[var(--color-text-secondary)]">Loading lessons...</p>
                        </div>
                    ) : lessonsError ? (
                        <div className="rounded-2xl border border-red-200 bg-white px-6 py-12 text-center" role="alert">
                            <h2 className="m-0 text-lg font-bold text-[var(--color-text-primary)]">Unable to load lessons</h2>
                            <p className="mb-0 mt-2 text-sm text-[var(--color-danger)]">{lessonsError}</p>
                        </div>
                    ) :  lessons.length > 0 ? (
                        <LessonList
                            lessons={lessons}
                            type="UPCOMING"
                        />
                    ) : (
                        <EmptyState
                            title="No upcoming lessons"
                            subtitle="Your confirmed lessons will appear here."
                        />
                    )}
                </div>
            </section>

        </main>
    )
}

export default StudentLessonsPage