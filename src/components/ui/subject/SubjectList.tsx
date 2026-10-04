import type { TutorSubject } from "../../../types/subject"
import TutorSubjectComponent from "./SubjectComponent"

type SubjectListProps = {
    tutorSubjects: TutorSubject[],
    deletingSubjectId: string | null,
    editingSubjectId: string | null,
    onDelete: (subjectId: string) => void,
    onEdit: (tutorSubject: TutorSubject) => void,
}

function SubjectList({
    tutorSubjects,
    deletingSubjectId,
    editingSubjectId,
    onDelete,
    onEdit
}: SubjectListProps) {
    return (
        <section className="grid gap-4 md:grid-cols-2" aria-label="Tutor's subjects">
            {tutorSubjects.map((tutorSubject) =>(
                <TutorSubjectComponent
                    key={tutorSubject.id}
                    tutorSubject={tutorSubject}
                    deletingTutorSubjectId={deletingSubjectId}
                    editingTutorSubjectId={editingSubjectId}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </section>
    )
}

export default SubjectList