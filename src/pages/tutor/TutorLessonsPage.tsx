import { useEffect, useState } from "react"
import HeaderComponent from "../../components/ui/header/HeaderComponent"
import MakeSidebar from "../../components/ui/sidebar/Sidebar"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import EmptyState from "../../components/ui/EmptyState"
import { tutorAcceptReservation, tutorGetLessons, tutorRejectReservation } from "../../api/lessonApi"
import { getApiErrorMessage } from "../../api/ApiError"
import type { TutorLesson } from "../../types/lesson"
import LessonList from "../../components/ui/lesson/LessonList"
import RejectModal from "../../components/ui/reject/RejectModal"
import AcceptModal from "../../components/ui/accept/AcceptModal"

function TutorLessonsPage() {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const [sidebarExpanded, setSidebarExpanded] = useState(true)
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const [isLoadingLessons, setIsLoadingLessons] = useState(true)
    const [lessonsError, setLessonsError] = useState('')
    const [lessons, setLessons] = useState<TutorLesson[]>([])
    const [isLoadingReservedSlots, setIsLoadingReservedSlots] = useState(true)
    const [reservedLessonsError, setReservedLessonsError] = useState('')
    const [reservedLessons, setReservedLessons] = useState<TutorLesson[]>([])
    const [acceptError, setAcceptError] = useState('')
    const [rejectError, setRejectError] = useState('')
    const [rejectPopup, setRejectPopup] = useState({
        show: false,
        lessonId: null as number | null
    })
    const [acceptPopup, setAcceptPopup] = useState({
        show: false,
        lessonId: null as number | null
    })

    const handleLogout = async () => {
        setIsLoggingOut(true)
        await logout()
        navigate('/login', {replace: true})
    }

    const handleAcceptReservedLesson = (lessonId: number) => {
        setAcceptPopup({
            show: true,
            lessonId: lessonId
        })
    }

    const handleAcceptReservedLessonTrue = async () => {
        try {
            if (acceptPopup.show && acceptPopup.lessonId) {
                setAcceptError('')
                await tutorAcceptReservation(acceptPopup.lessonId)
                await Promise.all([loadLessons(), loadReservedLessons()])
            }
        } catch(error) {
            setAcceptError(getApiErrorMessage(error, 'Could not accept reserved lesson.'))
        } finally {
            setAcceptPopup({
                show: false,
                lessonId: null
            })
        }
    }

    const handleAcceptReservedLessonFalse = () => {
        setAcceptPopup({
            show: false,
            lessonId: null
        })
    }

    const handleRejectReservedLesson = (lessonId: number) => {
        setRejectPopup({
            show: true,
            lessonId: lessonId
        })
    }
    
    const handleRejectReservedLessonTrue = async () => {
        try {
            if (rejectPopup.show && rejectPopup.lessonId) {
                setRejectError('')

                await tutorRejectReservation(rejectPopup.lessonId)
                await Promise.all([loadLessons(), loadReservedLessons()])
            }      
        } catch(error) {
            setRejectError(getApiErrorMessage(error, 'Could not reject reserved lesson.'))
        } finally {
            setRejectPopup({
                show: false,
                lessonId: null
            })
        }
    }

    const handleRejectReservedLessonFalse = () => {
        setRejectPopup({
            show: false,
            lessonId: null
        })
    }

    const loadLessons = async () => {
        try {
            setLessonsError('')
            const response = await tutorGetLessons('CONFIRMED')
            setLessons(response.lessons)
        } catch (error) {
            setLessonsError(getApiErrorMessage(error, 'Could not load lessons.'))
        } finally {
            setIsLoadingLessons(false)
        }
    }

    const loadReservedLessons = async () => {
        try {
            setReservedLessonsError('')
            const response = await tutorGetLessons('PENDING')
            setReservedLessons(response.lessons)
        } catch(error) {
            setReservedLessonsError(getApiErrorMessage(error, 'Could not load reserved lessons.'))
        } finally {
            setIsLoadingReservedSlots(false)
        }
    }

    useEffect(() => {
        void loadLessons()
        void loadReservedLessons()
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
                        <h2 className="m-0 text-xl font-bold text-[var(--color-text-primary)]">Reserved lessons</h2>
                    </div>
                    {acceptError && (
                        <div className="mb-4 rounded-xl border border-rose-200 bg-white px-4 py-3 text-sm text-[var(--color-danger)]" role="alert">
                            {acceptError}
                        </div>
                    )}
                    {isLoadingReservedSlots ? (
                        <div className="rounded-2xl border border-[var(--color-border)] bg-white px-6 py-12 text-center" role="status">
                            <p className="m-0 text-sm text-[var(--color-text-secondary)]">Loading reserved slots...</p>
                        </div>
                    ) : reservedLessonsError ? (
                        <div className="rounded-2xl border border-red-200 bg-white px-6 py-12 text-center" role="alert">
                            <h2 className="m-0 text-lg font-bold text-[var(--color-text-primary)]">Unable to load reserved slots.</h2>
                            <p className="mb-0 mt-2 text-sm text-[var(--color-danger)]">{reservedLessonsError}</p>
                        </div>
                    ) : reservedLessons.length > 0 ? (
                        <LessonList 
                            lessons={reservedLessons}
                            type="RESERVED"
                            onAccept={handleAcceptReservedLesson}
                            onReject={handleRejectReservedLesson}
                            acceptingLessonId={acceptPopup.lessonId}
                            rejectingLessonId={rejectPopup.lessonId}
                        />
                    ) : (
                        <EmptyState
                            title="No reserved lessons"
                            subtitle="Once a student books your slot it will appear here."
                        />
                    )}
                    {rejectPopup.show && rejectPopup.lessonId !== null && (
                        <RejectModal
                            typeName="lesson"
                            onReject={handleRejectReservedLessonTrue}
                            onClose={handleRejectReservedLessonFalse}
                        />
                    )}
                    {acceptPopup.show && acceptPopup.lessonId !== null && (
                        <AcceptModal 
                            typeName="lesson"
                            onAccept={handleAcceptReservedLessonTrue}
                            onClose={handleAcceptReservedLessonFalse}
                        />
                    )}


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
export default TutorLessonsPage