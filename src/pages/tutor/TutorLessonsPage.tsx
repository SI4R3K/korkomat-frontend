import { useEffect, useState } from "react"
import HeaderComponent from "../../components/ui/header/HeaderComponent"
import MakeSidebar from "../../components/ui/sidebar/Sidebar"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import EmptySlotsState from "../../components/ui/slot/EmptySlotsState"
import { tutorGetLessons } from "../../api/lessonApi"
import type { TutorLesson } from "../../types/lesson"
import LessonList from "../../components/ui/lesson/LessonList"

function TutorLessonsPage() {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const [sidebarExpanded, setSidebarExpanded] = useState(true)
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const [isLoadingLessons, setIsLoadingLessons] = useState(true)
    const [lessonsError, setLessonsError] = useState('')
    const [lessons, setLessons] = useState<TutorLesson[]>([])

    const handleLogout = async () => {
        setIsLoggingOut(true)
        await logout()
        navigate('/login', {replace: true})
    }

    const loadLessons = async () => {
        try {
            setLessonsError('')
            const response = await tutorGetLessons('PENDING')
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
        <main className="min-h-screen bg-[var(--color-background)]">
            <MakeSidebar
                profileType="Tutor"
                expanded={sidebarExpanded}
                setExpanded={setSidebarExpanded}
                onLogout={handleLogout}
                isLoggingOut={isLoggingOut}
            />
            <section className={`min-h-screen pl-0 transition-all ${sidebarExpanded ? 'sm:pl-[280px]' : 'sm:pl-[84px]'}`}>
                <div className="mx-auto max-w-[1200px] px-5 py-6 sm:px-10 sm:py-10">
                    <HeaderComponent
                        profileType='Tutor'
                        title='workspace'
                        subtitle='View and manage your lessons.'
                        subsubtitle='Accept or reject reserved slots. Manage upcoming lessons.' 
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
                        <LessonList lessons={lessons} />
                    ) : (
                        <EmptySlotsState />
                    )}
                </div>
            </section>
        </main>
    )
}
export default TutorLessonsPage