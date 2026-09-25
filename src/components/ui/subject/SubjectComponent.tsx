import { type SubjectLevel, type TutorSubject } from "../../../types/subject"

type SubjectComponentProps = {
    tutorSubjects: TutorSubject[]
}

const levelLabels: Record<SubjectLevel, string> = {
    PRIMARY_SCHOOL: 'Primary school',
    EIGHT_GRADE_EXAM: 'Eighth-grade exam',
    HIGH_SCHOOL: 'High school',
    MATURA_EXAM: 'Matura exam',
    UNIVERSITY: 'University',
}

function TutorSubjectComponent({tutorSubjects}: SubjectComponentProps) {

    return (
        <div className="grid gap-4 md:grid-cols-2">
            {tutorSubjects.map((tutorSubject) => (
                <article key={tutorSubject.id} className="rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-[0_8px_24px_rgb(25_43_58/5%)]">
                    <h3 className="m-0 text-lg font-bold text-[var(--color-text-primary)]">{tutorSubject.subjectName}</h3>
                    <p className="mb-0 mt-2 text-sm font-bold text-[var(--color-primary)]">{tutorSubject.level ? levelLabels[tutorSubject.level] : 'Level not provided'}</p>
                    <p className="mb-0 mt-3 leading-relaxed text-[var(--color-text-secondary)]">{tutorSubject.description}</p>
                </article>
            ))}
        </div>
    )
}

export default TutorSubjectComponent