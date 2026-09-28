import { type SubjectLevel, type TutorSubject } from "../../../types/subject"

type TutorSubjectComponentProps = {
    tutorSubject: TutorSubject,
    deletingTutorSubjectId: string | null
    onDelete: (tutorSubjectId: string) => void
}

const levelLabels: Record<SubjectLevel, string> = {
    PRIMARY_SCHOOL: 'Primary school',
    EIGHT_GRADE_EXAM: 'Eighth-grade exam',
    HIGH_SCHOOL: 'High school',
    MATURA_EXAM: 'Matura exam',
    UNIVERSITY: 'University',
}

function TutorSubjectComponent({
    tutorSubject,
    deletingTutorSubjectId,
    onDelete
}: TutorSubjectComponentProps) {
    const isDeleting = deletingTutorSubjectId === tutorSubject.id
    const isDeletingDisabled = deletingTutorSubjectId != null

    return (
        <article key={tutorSubject.id} className="rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-[0_8px_24px_rgb(25_43_58/5%)]">
            <h3 className="m-0 text-lg font-bold text-[var(--color-text-primary)]">{tutorSubject.subjectName}</h3>
            <p className="mb-0 mt-2 text-sm font-bold text-[var(--color-primary)]">{tutorSubject.level ? levelLabels[tutorSubject.level] : 'Level not provided'}</p>
            <p className="mb-0 mt-3 leading-relaxed text-[var(--color-text-secondary)]">{tutorSubject.description}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <button type="button" className="rounded-xl border border-[var(--color-border)] px-4 py-3 font-bold text-[var(--color-text-primary)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]">
                    Edit 
                </button>
                <button 
                    type="button" 
                    className="rounded-xl border border-red-200 px-4 py-3 font-bold text-[var(--color-danger)] transition hover:border-[var(--color-danger)] hover:bg-red-50"
                    onClick={() => onDelete(tutorSubject.id)}
                    disabled={isDeletingDisabled}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
            </div>
        </article>
    )
}

export default TutorSubjectComponent