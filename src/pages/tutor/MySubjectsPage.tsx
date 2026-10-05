import { useEffect, useState, type SubmitEvent } from "react"
import { useNavigate } from "react-router-dom"
import MakeSidebar from "../../components/ui/sidebar/Sidebar"
import { useAuth } from "../../context/AuthContext"
import { getApiErrorMessage } from "../../api/ApiError"
import { type Subject, type SubjectLevel, type TutorSubject, type UpdateTutorSubjectRequest } from "../../types/subject"
import { 
    tutorGetMyTutorSubjects, 
    tutorGetSubjects, 
    tutorAddMyTutorSubject, 
    tutorDeleteMyTutorSubject,
    tutorUpdateMyTutorSubject
} from "../../api/subjectApi"
import SubjectForm from "../../components/ui/subject/SubjectForm"
import HeaderComponent from '../../components/ui/header/HeaderComponent'
import SubjectList from "../../components/ui/subject/SubjectList"
import DeleteModal from "../../components/ui/delete/DeleteModal"
import EditTutorSubjectModal from "../../components/ui/edit/EditTutorSubjectModal"

function MySubjectsPage() {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const [sidebarExpanded, setSidebarExpanded] = useState(true)
    const [subjects, setSubjects] = useState<Subject[]>([])
    const [subjectsError, setSubjectsError] = useState('')
    const [isLoadingSubjects, setIsLoadingSubjects] = useState(true)
    const [tutorSubjects, setTutorSubjects] = useState<TutorSubject[]>([])
    const [selectedSubjectId, setSelectedSubjectId] = useState('')
    const [selectedLevel, setSelectedLevel] = useState<SubjectLevel | ''>('')
    const [description, setDescription] = useState('')
    const [createSubjectError, setCreateSubjectError] = useState('')
    const [deleteTutorSubjectError, setDeleteTutorSubjectError] = useState('')
    const [editTutorSubjectError, setEditTutorSubjectError] = useState('')
    const [deletePopup, setDeletePopup] = useState({
        show: false,
        tutorSubjectId: null as string | null
    })
    const [editPopup, setEditPopup] = useState({
        show: false,
        tutorSubjectToEdit: null as TutorSubject | null
    })

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
            setTutorSubjects(currentTutorSubjects)
        } catch(error) {
            setSubjectsError(getApiErrorMessage(error, 'Could not load subjects.'))
        } finally {
            setIsLoadingSubjects(false)
        }
    }

    const handleAddSubject = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        setCreateSubjectError('')

        if (!selectedSubjectId || !selectedLevel || !description.trim()) {
            setCreateSubjectError('Choose a subject, select a level, and add a description.')
            return
        }

        const selectedSubject = subjects.find((subject) => String(subject.id) === selectedSubjectId)
        if (!selectedSubject) {
            setCreateSubjectError('The selected subject is no longer available.')
            return
        }

        const duplicateSubject = tutorSubjects.some((tutorSubject) =>
            tutorSubject.subjectName === selectedSubject.name && tutorSubject.level === selectedLevel,
        )
        if (duplicateSubject) {
            setCreateSubjectError('You already teach this subject at the selected level.')
            return
        }

        try {
            await tutorAddMyTutorSubject({
                subjectId: selectedSubjectId,
                description,
                level: selectedLevel,
            })
            await loadSubjects()
            setSelectedSubjectId('')
            setSelectedLevel('')
            setDescription('')
        } catch (error) {
            let errorMessage = getApiErrorMessage(error, '')

            try {
                const response = JSON.parse(errorMessage) as { message?: string }
                errorMessage = response.message ?? errorMessage
            } catch {
                // Keep the original message when the API response is not JSON.
            }

            setCreateSubjectError(errorMessage === 'Tutor subject already exists'
                ? 'You already teach this subject at the selected level.'
                : errorMessage || 'Could not create the subject.')
        }
    }

    const handleDeleteTutorSubject = (tutorSubjectId: string) => {
        setDeletePopup({
            show: true,
            tutorSubjectId
        })
    }

    const handleDeleteTutorSubjectTrue = async () => {
        try {
            if (deletePopup.show && deletePopup.tutorSubjectId) {
                setDeleteTutorSubjectError('')

                await tutorDeleteMyTutorSubject(deletePopup.tutorSubjectId)
                await Promise.all([loadSubjects()])
            }
        } catch(error) {
            setDeleteTutorSubjectError(getApiErrorMessage(error, 'Could not delete selected tutors subject'))
        } finally {
            setDeletePopup({
                show: false,
                tutorSubjectId: null
            })
        }
    }

    const handleEditTutorSubject = (tutorSubject: TutorSubject) => {
        setEditTutorSubjectError('')
        setEditPopup({
            show: true,
            tutorSubjectToEdit: tutorSubject
        })
    }

    const handleEditTutorSubjectTrue = async (updatedTutorSubject: UpdateTutorSubjectRequest) => {
        const selectedTutorSubject = editPopup.tutorSubjectToEdit
        if (!selectedTutorSubject) return

        const { id } = selectedTutorSubject
        if (!id) return

        try {
            setEditTutorSubjectError('')

            await tutorUpdateMyTutorSubject(
                parseInt(id),
                updatedTutorSubject
            )
            await loadSubjects() // Refresh the subjects after editing
            setEditPopup({
                show: false,
                tutorSubjectToEdit: null
            })
        } catch(error) {
            let errorMessage = getApiErrorMessage(error, '')

            try {
                const response = JSON.parse(errorMessage) as { message?: string }
                errorMessage = response.message ?? errorMessage
            } catch {
                // Keep the original message when the API response is not JSON.
            }

            setEditTutorSubjectError(errorMessage === 'Tutor subject already exists'
                ? 'You already teach this subject at the selected level.'
                : errorMessage || 'Could not update the selected tutor subject.')
        }
    }

    const handleEditTutorSubjectFalse = () => {
        setEditTutorSubjectError('')
        setEditPopup({
            show: false,
            tutorSubjectToEdit: null
        })
    }

    useEffect(() => {
        void loadSubjects()
    }, [])

    return (
        <main className="min-h-screen bg-[var(--color-background)]">
            <MakeSidebar profileType="Tutor" expanded={sidebarExpanded} setExpanded={setSidebarExpanded} onLogout={handleLogout} isLoggingOut={isLoggingOut}/>
            <section className={`min-h-screen pl-0 transition-all ${sidebarExpanded ? 'sm:pl-[280px]' : 'sm:pl-[84px]'}`}>
                <div className="mx-auto max-w-[1200px] px-5 py-6 sm:px-10 sm:py-10">
                    <HeaderComponent
                        profileType='Tutor'
                        title='workspace'
                        subtitle='Manage your subjects'
                        subsubtitle='Tell students which subjects and levels you teach.'
                    />

                    <SubjectForm
                        handleAddSubject={handleAddSubject}
                        handleSubjectChange={setSelectedSubjectId}
                        handleDescriptionChange={setDescription}
                        selectedLevel={selectedLevel}
                        handleLevelChange={setSelectedLevel}
                        selectedSubjectId={selectedSubjectId}
                        subjects={subjects}
                        description={description}
                        createSubjectError={createSubjectError}
                    />

                    <div className="mb-4 mt-8 flex items-center justify-between gap-4">
                        <h2 className="m-0 text-xl font-bold text-[var(--color-text-primary)]">Your subjects</h2>
                        <span className="text-sm text-[var(--color-text-secondary)]">{tutorSubjects.length} {tutorSubjects.length === 1 ? 'subject' : 'subjects'}</span>
                    </div>
                    {deleteTutorSubjectError && <p className="mb-4 text-sm text-[var(--color-danger)]" role="alert">{deleteTutorSubjectError}</p>}
                    {isLoadingSubjects ? (
                        <div className="rounded-2xl border border-[var(--color-border)] bg-white px-6 py-12 text-center" role="status"><p className="m-0 text-sm text-[var(--color-text-secondary)]">Loading subjects...</p></div>
                    ) : subjectsError ? (
                        <div className="rounded-2xl border border-red-200 bg-white px-6 py-12 text-center" role="alert"><h2 className="m-0 text-lg font-bold text-[var(--color-text-primary)]">Unable to load subjects</h2><p className="mb-0 mt-2 text-sm text-[var(--color-danger)]">{subjectsError}</p></div>
                    ) : tutorSubjects.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-white px-6 py-12 text-center"><p className="m-0 text-sm text-[var(--color-text-secondary)]">No subjects added yet.</p></div>
                    ) : (
                        <SubjectList 
                            tutorSubjects={tutorSubjects}
                            editingSubjectId={editPopup.tutorSubjectToEdit?.id ?? null}
                            deletingSubjectId={deletePopup.tutorSubjectId}
                            onDelete={handleDeleteTutorSubject}
                            onEdit={handleEditTutorSubject} 
                        />
                    )}
                    {deletePopup.show && deletePopup.tutorSubjectId && (
                        <DeleteModal 
                            typeName="subject"
                            onDelete={handleDeleteTutorSubjectTrue}
                            onClose={() => setDeletePopup({ show: false, tutorSubjectId: null })}
                        />
                    )}
                    {editPopup.show && editPopup.tutorSubjectToEdit !== null && (
                        <EditTutorSubjectModal
                            currentTutorSubject={editPopup.tutorSubjectToEdit}
                            subjects={subjects}
                            errorMessage={editTutorSubjectError}
                            onEdit={handleEditTutorSubjectTrue}
                            onClose={handleEditTutorSubjectFalse}
                        />
                    )}
                </div>
            </section>
        </main>
    )
}

export default MySubjectsPage