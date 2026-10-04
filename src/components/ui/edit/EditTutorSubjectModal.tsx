import type {
    Subject,
    SubjectLevel,
    TutorSubject,
    UpdateTutorSubjectRequest,
} from '../../../types/subject'

import { useState } from 'react'

import Button from '../button/Button'

interface EditTutorSubjectModalProps {
    currentTutorSubject: TutorSubject
    subjects: Subject[]
    errorMessage: string
    onEdit: (tutorSubject: UpdateTutorSubjectRequest) => void
    onClose: () => void
}

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

function EditTutorSubjectModal({
    currentTutorSubject,
    subjects,
    errorMessage,
    onEdit,
    onClose
}: EditTutorSubjectModalProps) {
    const [updatedTutorSubject, setUpdatedTutorSubject] = useState<UpdateTutorSubjectRequest>({
        subjectId: currentTutorSubject.subjectId,
        level: currentTutorSubject.level,
        description: currentTutorSubject.description ?? '',
    })

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgb(25_43_58/45%)] p-4 sm:p-5" role="presentation">
            <section
                aria-labelledby="edit-title"
                aria-modal="true"
                className="w-full max-w-2xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_24px_60px_rgb(25_43_58/20%)] sm:p-8"
                role="dialog"
            >
                <h2 id="edit-title" className="m-0 text-xl font-bold text-[var(--color-text-primary)] sm:text-2xl">Edit Selected Subject</h2>
                <div className="mt-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-4 sm:p-5">
                    <h3 className="m-0 text-sm font-bold uppercase tracking-wide text-[var(--color-text-secondary)]">Current subject</h3>
                    <dl className="mb-0 mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                        <div>
                            <dt className="text-xs font-semibold uppercase text-[var(--color-text-secondary)]">Subject</dt>
                            <dd className="mb-0 mt-1 font-semibold text-[var(--color-text-primary)]">{currentTutorSubject.subjectName}</dd>
                        </div>
                        <div>
                            <dt className="text-xs font-semibold uppercase text-[var(--color-text-secondary)]">Level</dt>
                            <dd className="mb-0 mt-1 font-semibold text-[var(--color-text-primary)]">{levelLabels[currentTutorSubject.level]}</dd>
                        </div>
                        <div>
                            <dt className="text-xs font-semibold uppercase text-[var(--color-text-secondary)]">Description</dt>
                            <dd className="mb-0 mt-1 font-semibold text-[var(--color-text-primary)]">{currentTutorSubject.description}</dd>
                        </div>
                    </dl>
                </div>
                
                <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
                    <label className="flex flex-col gap-2 text-sm font-bold text-[var(--color-text-primary)]" htmlFor="subject-name">
                        Subject name
                        <select id="subject-name" required value={updatedTutorSubject.subjectId} onChange={(event) => setUpdatedTutorSubject({ ...updatedTutorSubject, subjectId: parseInt(event.target.value) })} className="rounded-xl border border-[var(--color-border)] bg-white px-3 py-3 font-normal outline-none focus:border-[var(--color-border-focus)] focus:ring-4 focus:ring-[var(--color-primary-soft)]">
                            {subjects.map((subject) => (
                                <option key={subject.id} value={subject.id}>{subject.name}</option>
                            ))}
                        </select>
                    </label>
    
                    <fieldset>
                        <label className="flex flex-col gap-2 text-sm font-bold text-[var(--color-text-primary)]" htmlFor="subject-level">
                            Level you teach
                            <select id="subject-level" required value={updatedTutorSubject.level} onChange={(event) => setUpdatedTutorSubject({ ...updatedTutorSubject, level: event.target.value as SubjectLevel })} className="rounded-xl border border-[var(--color-border)] bg-white px-3 py-3 font-normal outline-none focus:border-[var(--color-border-focus)] focus:ring-4 focus:ring-[var(--color-primary-soft)]">
                                {subjectLevels.map((level) => (
                                    <option key={level} value={level}>{levelLabels[level]}</option>
                                ))}
                                </select>
                        </label>
                    </fieldset>
                </div>
                
                <label className="mt-5 flex flex-col gap-2 text-sm font-bold text-[var(--color-text-primary)]" htmlFor="subject-description">
                    Short description
                    <textarea id="subject-description" required rows={4} maxLength={500} value={updatedTutorSubject.description} onChange={(event) => setUpdatedTutorSubject({ ...updatedTutorSubject, description: event.target.value })} placeholder="Describe what students can learn with you..." className="resize-y rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 font-normal outline-none focus:border-[var(--color-border-focus)] focus:ring-4 focus:ring-[var(--color-primary-soft)]" />
                </label>
                {errorMessage && <p className="mb-0 mt-3 text-sm text-[var(--color-danger)]" role="alert">{errorMessage}</p>}

                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <Button 
                        variant="secondary" 
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => onEdit(updatedTutorSubject)}>
                        Save Changes
                    </Button>
                </div>
            </section>
        </div>
    )
}

export default EditTutorSubjectModal