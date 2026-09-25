import {
    CalendarDaysIcon,
    ClockIcon,
    MapPinIcon,
} from '@heroicons/react/24/outline'

import type { StudentLesson, TutorLesson } from "../../../types/lesson"
import mapApiTime from "../../../util/ApiTimeMapper"

type LessonComponentProps = {
    lesson: TutorLesson 
}

function LessonComponent({
    lesson
}: LessonComponentProps) {

    const startTime = lesson.startTime
    const endTime = lesson.endTime

    const uiTime = mapApiTime({
        startTime,
        endTime
    })

    return (
        <article className="rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-[0_8px_24px_rgb(25_43_58/5%)] transition hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:shadow-[0_12px_28px_rgb(25_43_58/10%)]">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="m-0 text-sm font-bold uppercase tracking-[0.06em] text-[var(--color-primary)]">{lesson.subjectName}</p>
                    <h3 className="mb-0 mt-2 text-xl font-bold text-[var(--color-text-primary)]">
                        {lesson.studentName}
                    </h3>
                </div>
                <span className="rounded-full bg-[var(--color-primary-soft)] px-3 py-1 text-xs font-bold text-[var(--color-primary)]">{lesson.place}</span>
            </div>
            <div className="mt-5 grid gap-3 text-sm text-[var(--color-text-secondary)] sm:grid-cols-2">
                <span className="flex items-center gap-2"><CalendarDaysIcon className="size-4 text-[var(--color-primary)]" />{uiTime.dateLabel ?? uiTime.date}</span>
                <span className="flex items-center gap-2"><ClockIcon className="size-4 text-[var(--color-primary)]" />{uiTime.time}</span>
                <span className="flex items-center gap-2 sm:col-span-2"><MapPinIcon className="size-4 text-[var(--color-primary)]" />{lesson.place}</span>
            </div>
        </article>
    )
}

export default LessonComponent