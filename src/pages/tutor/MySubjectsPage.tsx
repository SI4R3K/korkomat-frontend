import { useEffect, useState, type SubmitEvent } from "react"
import { useNavigate } from "react-router-dom"
import MakeSidebar from "../../components/ui/sidebar/Sidebar"
import { useAuth } from "../../context/AuthContext"
import { type Subject, type SubjectLevel, type TutorSubject, type CreateTutorSubjectRequest } from "../../types/subject"
import { tutorGetMyTutorSubjects, tutorGetSubjects, tutorAddMyTutorSubject } from "../../api/subjectApi"
import TutorSubjectComponent from "../../components/ui/subject/SubjectComponent"
import SubjectForm from "../../components/ui/subject/SubjectForm"

type LocalTutorSubject = TutorSubject & {
    subjectName: string
}

function MySubjectsPage() {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const [sidebarExpanded, setSidebarExpanded] = useState(true)
    const [subjects, setSubjects] = useState<Subject[]>([])
    const [subjectsError, setSubjectsError] = useState('')
    const [isLoadingSubjects, setIsLoadingSubjects] = useState(true)
    const [tutorSubjects, setTutorSubjects] = useState<LocalTutorSubject[]>([])
    const [selectedSubjectId, setSelectedSubjectId] = useState('')
    const [selectedLevels, setSelectedLevels] = useState<SubjectLevel[]>([])
    const [description, setDescription] = useState('')
    const [createSubjectError, setCreateSubjectError] = useState('')

    const handleLogout = async () => {
        setIsLoggingOut(true)
        await logout()
        navigate('/login', {replace: true})
    }

    const loadSubjects = async () => {
        try {
            setSubjectsError('')
            const [availableSubjects, currentTutorSubjects] = await Promise.all([
                tutorGetSubjects(),
                tutorGetMyTutorSubjects(),
            ])
            setSubjects(availableSubjects)
            setTutorSubjects(currentTutorSubjects.map((tutorSubject) => ({
                ...tutorSubject,
                subjectName: tutorSubject.subjectName,
            })))
        } catch(error) {
            setSubjectsError(error instanceof Error ? error.message : 'Could not load subjects.')
        } finally {
            setIsLoadingSubjects(false)
        }
    }

    useEffect(() => {
        void loadSubjects()
    }, [])

    const toggleLevel = (level: SubjectLevel) => {
        setSelectedLevels((currentLevels) => currentLevels.includes(level)
            ? currentLevels.filter((currentLevel) => currentLevel !== level)
            : [...currentLevels, level])
    }

    const handleAddSubject = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        setCreateSubjectError('')

        if (!selectedSubjectId || selectedLevels.length === 0 || !description.trim()) {
            setCreateSubjectError('Choose a subject, select at least one level, and add a description.')
            return
        }

        const selectedSubject = subjects.find((subject) => String(subject.id) === selectedSubjectId)
        if (!selectedSubject) {
            setCreateSubjectError('The selected subject is no longer available.')
            return
        }

        tutorAddMyTutorSubject({
            subjectId: selectedSubjectId,
            description,
            level: selectedLevels[0],
        })

        setTutorSubjects((currentSubjects) => [
            ...currentSubjects,
            {
                id: Date.now(),
                name: selectedSubject.name,
                subjectName: selectedSubject.name,
                level: selectedLevels[0],
                levels: selectedLevels,
                description: description.trim(),
            },
        ])
        setSelectedSubjectId('')
        setSelectedLevels([])
        setDescription('')
    }

    return (
        <main className="min-h-screen bg-[var(--color-background)]">
            <MakeSidebar profileType="Tutor" expanded={sidebarExpanded} setExpanded={setSidebarExpanded} onLogout={handleLogout} isLoggingOut={isLoggingOut}/>
            <section className={`min-h-screen pl-0 transition-all ${sidebarExpanded ? 'sm:pl-[280px]' : 'sm:pl-[84px]'}`}>
                <div className="mx-auto max-w-[1200px] px-5 py-6 sm:px-10 sm:py-10">
                    <header className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-primary)]">Tutor workspace</span>
                        <h1 className="mb-2 mt-2 text-3xl font-bold text-[var(--color-text-primary)] sm:text-[42px]">Manage your subjects</h1>
                        <p className="m-0 max-w-xl leading-relaxed text-[var(--color-text-secondary)]">Tell students which subjects and levels you teach.</p>
                    </header>

                    <SubjectForm
                        handleAddSubject={handleAddSubject}
                        handleSubjectChange={setSelectedSubjectId}
                        handleDescriptionChange={setDescription}
                        toggleLevel={toggleLevel}
                        selectedSubjectId={selectedSubjectId}
                        selectedLevels={selectedLevels}
                        subjects={subjects}
                        description={description}
                        createSubjectError={createSubjectError}
                    />

                    <div className="mb-4 mt-8 flex items-center justify-between gap-4">
                        <h2 className="m-0 text-xl font-bold text-[var(--color-text-primary)]">Your subjects</h2>
                        <span className="text-sm text-[var(--color-text-secondary)]">{tutorSubjects.length} {tutorSubjects.length === 1 ? 'subject' : 'subjects'}</span>
                    </div>
                    {isLoadingSubjects ? (
                        <div className="rounded-2xl border border-[var(--color-border)] bg-white px-6 py-12 text-center" role="status"><p className="m-0 text-sm text-[var(--color-text-secondary)]">Loading subjects...</p></div>
                    ) : subjectsError ? (
                        <div className="rounded-2xl border border-red-200 bg-white px-6 py-12 text-center" role="alert"><h2 className="m-0 text-lg font-bold text-[var(--color-text-primary)]">Unable to load subjects</h2><p className="mb-0 mt-2 text-sm text-[var(--color-danger)]">{subjectsError}</p></div>
                    ) : tutorSubjects.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-white px-6 py-12 text-center"><p className="m-0 text-sm text-[var(--color-text-secondary)]">No subjects added yet.</p></div>
                    ) : (
                        <TutorSubjectComponent tutorSubjects={tutorSubjects} />
                    )}
                </div>
            </section>
        </main>
    )
}

export default MySubjectsPage