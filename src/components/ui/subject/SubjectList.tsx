import type { TutorSubject } from "../../../types/subject"
import TutorSubjectComponent from "./SubjectComponent"

type SubjectListProps = {
    tutorSubjects: TutorSubject[],
    deletingSubjectId: string | null,
    onDelete: (subjectId: string) => void
}

function SubjectList({
    tutorSubjects,
    deletingSubjectId,
    onDelete,
}: SubjectListProps) {
    return (
        <section className="grid gap-4 md:grid-cols-2" aria-label="Tutor's subjects">
            {tutorSubjects.map((tutorSubject) =>(
                <TutorSubjectComponent
                    key={tutorSubject.id}
                    tutorSubject={tutorSubject}
                    deletingTutorSubjectId={deletingSubjectId}
                    onDelete={onDelete}
                />
            ))}
        </section>
    )
}

export default SubjectList