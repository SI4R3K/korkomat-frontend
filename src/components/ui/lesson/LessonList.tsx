import type { StudentLesson, TutorLesson } from "../../../types/lesson";
import LessonComponent from "./LessonComponent";

type LessonListProps = {
    lessons: (TutorLesson | StudentLesson)[]
    type: "RESERVED" | "UPCOMING",
    onAccept?: (lessonId: number) => void
    onReject?: (lessonId: number) => void
    acceptingLessonId?: number | null
    rejectingLessonId?: number | null
}

function LessonList({
    lessons,
    type,
    onAccept,
    onReject,
    acceptingLessonId,
    rejectingLessonId
}: LessonListProps) {
    return (
        <section className="grid gap-4 md:grid-cols-2" aria-label="Available time slots">
            {lessons.map((lesson) => (
                <LessonComponent 
                    key={lesson.id} 
                    lesson={lesson}
                    type={type}
                    onAccept={onAccept} 
                    onReject={onReject}
                    acceptingLessonId={acceptingLessonId}
                    rejectingLessonId={rejectingLessonId}
                />
            ))}
        </section>
    )
}

export default LessonList