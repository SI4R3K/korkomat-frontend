import { type Subject } from "../../../types/subject"

type SubjectComponentProps = {
    // tutorSubject: TutorSubject,
    subjects: Subject[]
}

function TutorSubjectComponent({subjects}: SubjectComponentProps) {

    return (
        <article className="rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-[0_8px_24px_rgb(25_43_58/5%)] transition hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:shadow-[0_12px_28px_rgb(25_43_58/10%)]">
            {subjects.map((subject) => <p key={subject.id} className="m-0 text-[var(--color-text-primary)]">{subject.name}</p>)}
        </article>
    )
}

export default TutorSubjectComponent