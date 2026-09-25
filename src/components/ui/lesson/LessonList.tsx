import type { TutorLesson } from "../../../types/lesson";
import LessonComponent from "./LessonComponent";

type LessonListProps = {
    lessons: TutorLesson[]
}

function LessonList({
    lessons,
}: LessonListProps) {
    return (
        <section className="grid gap-4 md:grid-cols-2" aria-label="Available time slots">
            {lessons.map((lesson) => (
                <LessonComponent key={lesson.id} lesson={lesson} />
            ))}
        </section>
    )
}

export default LessonList