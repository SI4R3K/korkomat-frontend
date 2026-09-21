import { useEffect, useState, type SubmitEvent } from "react"
import { useNavigate } from "react-router-dom"
import MakeSidebar from "../../components/ui/sidebar/Sidebar"
import { useAuth } from "../../context/AuthContext"
import { type Subject, type SubjectLevel, type TutorSubject } from "../../types/subject"
import { tutorGetMyTutorSubjects, tutorGetSubjects } from "../../api/subjectApi"

const subjectLevels: SubjectLevel[] = [
    'PRIMARY_SCHOOL',
    'EIGHT_GRADE_EXAM',
    'HIGH_SCHOOL',
    'MATURA_EXAM',
    'UNIVERSITY',
]

const levelLabels: Record<SubjectLevel, string> = {
    PRIMARY_SCHOOL: 'Primary school',
    EIGHT_GRADE_EXAM: 'Eighth-grade exam',
    HIGH_SCHOOL: 'High school',
    MATURA_EXAM: 'Matura exam',
    UNIVERSITY: 'University',
}

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

                    <form onSubmit={handleAddSubject} className="rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-[0_8px_24px_rgb(25_43_58/8%)] sm:p-6">
                        <h2 className="m-0 text-xl font-bold text-[var(--color-text-primary)]">Add a subject</h2>
                        <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
                            <label className="flex flex-col gap-2 text-sm font-bold text-[var(--color-text-primary)]" htmlFor="subject-name">
                                Subject name
                                <select id="subject-name" required value={selectedSubjectId} onChange={(event) => setSelectedSubjectId(event.target.value)} className="rounded-xl border border-[var(--color-border)] bg-white px-3 py-3 font-normal outline-none focus:border-[var(--color-border-focus)] focus:ring-4 focus:ring-[var(--color-primary-soft)]">
                                    <option value="">Select a subject</option>
                                    {subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.name}</option>)}
                                </select>
                            </label>

                            <fieldset>
                                <legend className="text-sm font-bold text-[var(--color-text-primary)]">Levels you teach</legend>
                                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                                    {subjectLevels.map((level) => (
                                        <label key={level} className="flex cursor-pointer items-center gap-3 rounded-xl border border-[var(--color-border)] px-3 py-3 text-sm text-[var(--color-text-primary)] transition hover:border-[var(--color-primary)]">
                                            <input type="checkbox" checked={selectedLevels.includes(level)} onChange={() => toggleLevel(level)} className="h-4 w-4 accent-[var(--color-primary)]" />
                                            {levelLabels[level]}
                                        </label>
                                    ))}
                                </div>
                            </fieldset>
                        </div>

                        <label className="mt-5 flex flex-col gap-2 text-sm font-bold text-[var(--color-text-primary)]" htmlFor="subject-description">
                            Short description
                            <textarea id="subject-description" required rows={4} maxLength={500} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Describe what students can learn with you..." className="resize-y rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 font-normal outline-none focus:border-[var(--color-border-focus)] focus:ring-4 focus:ring-[var(--color-primary-soft)]" />
                        </label>
                        {createSubjectError && <p className="mb-0 mt-4 text-sm text-[var(--color-danger)]" role="alert">{createSubjectError}</p>}
                        <button type="submit" className="mt-5 rounded-xl bg-[var(--color-primary)] px-5 py-3 font-bold text-white transition hover:bg-[var(--color-primary-hover)]">Add subject</button>
                    </form>

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
                        <div className="grid gap-4 md:grid-cols-2">
                            {tutorSubjects.map((tutorSubject) => (
                                <article key={tutorSubject.id} className="rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-[0_8px_24px_rgb(25_43_58/5%)]">
                                    <h3 className="m-0 text-lg font-bold text-[var(--color-text-primary)]">{tutorSubject.subjectName}</h3>
                                    <p className="mb-0 mt-2 text-sm font-bold text-[var(--color-primary)]">{tutorSubject.levels.map((level) => levelLabels[level]).join(' · ') || 'Level not provided'}</p>
                                    <p className="mb-0 mt-3 leading-relaxed text-[var(--color-text-secondary)]">{tutorSubject.description}</p>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    )
}

export default MySubjectsPage