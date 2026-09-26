import {
    CalendarDaysIcon,
    CheckIcon,
    ClockIcon,
    MapPinIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'

import type { StudentLesson, TutorLesson } from "../../../types/lesson"
import mapApiTime from "../../../util/ApiTimeMapper"
import type { UiTime } from '../../../types/time'

type LessonComponentProps = {
    lesson: TutorLesson | StudentLesson
    type: 'RESERVED' | 'UPCOMING',
    onAccept?: (lessonId: number) => void
    onReject?: (lessonId: number) => void
    acceptingLessonId?: number | null
    rejectingLessonId?: number | null
}

function LessonComponent({
    lesson,
    type,
    onAccept,
    onReject,
    acceptingLessonId,
    rejectingLessonId,
}: LessonComponentProps) {

    const startTime = lesson.startTime
    const endTime = lesson.endTime

    const uiTime = mapApiTime({
        startTime,
        endTime
    })

    if (type === 'RESERVED' && 'studentName' in lesson && onAccept && onReject) {
        return (
            <ReservedLesson
                lesson={lesson}
                uiTime={uiTime}
                onAccept={onAccept}
                onReject={onReject}
                acceptingLessonId={acceptingLessonId}
                rejectingLessonId={rejectingLessonId}
            />
        )
    }

    return (
        <UpcomingLesson
            lesson={lesson}
            uiTime={uiTime}
        />
    )
}
export default LessonComponent


interface ReservedLessonProps {
    lesson: TutorLesson,
    uiTime: UiTime,
    onAccept: (lessonId: number) => void,
    onReject: (lessonId: number) => void,
    acceptingLessonId?: number | null
    rejectingLessonId?: number | null
}

function ReservedLesson({
    lesson,
    uiTime,
    onAccept,
    onReject,
    acceptingLessonId,
    rejectingLessonId,
}: ReservedLessonProps) {
    const isAccepting = acceptingLessonId === lesson.id
    const isAcceptDisabled = acceptingLessonId != null || rejectingLessonId != null
    const isRejecting = rejectingLessonId === lesson.id
    const isRejectDisabled = acceptingLessonId != null || rejectingLessonId != null

    return (
        <article className="rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-[0_8px_24px_rgb(25_43_58/5%)] transition hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:shadow-[0_12px_28px_rgb(25_43_58/10%)]">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="m-0 text-sm font-bold uppercase tracking-[0.06em] text-[var(--color-primary)]">{lesson.subjectName}</p>
                    <h3 className="mb-0 mt-2 text-xl font-bold text-[var(--color-text-primary)]">
                        {lesson.studentName}
                    </h3>
                </div>
                <span className="rounded-full bg-[var(--color-primary-soft)] px-3 py-1 text-xs font-bold text-[var(--color-primary)]">{lesson.format}</span>
            </div>
            <div className="mt-5 grid gap-3 text-sm text-[var(--color-text-secondary)] sm:grid-cols-2">
                <span className="flex items-center gap-2"><CalendarDaysIcon className="size-4 text-[var(--color-primary)]" />{uiTime.dateLabel ?? uiTime.date}</span>
                <span className="flex items-center gap-2"><ClockIcon className="size-4 text-[var(--color-primary)]" />{uiTime.time}</span>
                <span className="flex items-center gap-2 sm:col-span-2"><MapPinIcon className="size-4 text-[var(--color-primary)]" />{lesson.place}</span>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-3 border-t border-[var(--color-border)] pt-5">
                <button
                    type="button"
                    className="inline-flex min-h-11 w-full min-w-0 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-emerald-700 disabled:active:translate-y-0"
                    onClick={() => onAccept(lesson.id)}
                    disabled={isAcceptDisabled}
                    aria-busy={isAccepting}
                >
                    <CheckIcon className="size-4" />
                    {isAccepting ? 'Accepting...' : 'Accept'}
                </button>
                <button
                    type="button"
                    className="inline-flex min-h-11 w-full min-w-0 items-center justify-center gap-2 rounded-xl border border-rose-300 bg-white px-5 py-2.5 text-sm font-bold text-rose-700 transition hover:border-rose-400 hover:bg-rose-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 active:translate-y-px"
                    onClick={() => onReject(lesson.id)}
                    disabled={isRejectDisabled}
                    aria-busy={isRejecting}
                >
                    <XMarkIcon className="size-4" />
                    {isRejecting ? 'Rejecting...' : 'Reject'}
                </button>
            </div>
        </article> 
    )
}

interface UpcomingLessonProps {
    lesson: TutorLesson | StudentLesson,
    uiTime: UiTime
}

function UpcomingLesson({
    lesson,
    uiTime,
}: UpcomingLessonProps) {
    const participantName = 'studentName' in lesson ? lesson.studentName : lesson.tutorName

    return (
        <article className="rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-[0_8px_24px_rgb(25_43_58/5%)] transition hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:shadow-[0_12px_28px_rgb(25_43_58/10%)]">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="m-0 text-sm font-bold uppercase tracking-[0.06em] text-[var(--color-primary)]">{lesson.subjectName}</p>
                    <h3 className="mb-0 mt-2 text-xl font-bold text-[var(--color-text-primary)]">
                        {participantName}
                    </h3>
                </div>
                <span className="rounded-full bg-[var(--color-primary-soft)] px-3 py-1 text-xs font-bold text-[var(--color-primary)]">{lesson.format}</span>
            </div>
            <div className="mt-5 grid gap-3 text-sm text-[var(--color-text-secondary)] sm:grid-cols-2">
                <span className="flex items-center gap-2"><CalendarDaysIcon className="size-4 text-[var(--color-primary)]" />{uiTime.dateLabel ?? uiTime.date}</span>
                <span className="flex items-center gap-2"><ClockIcon className="size-4 text-[var(--color-primary)]" />{uiTime.time}</span>
                <span className="flex items-center gap-2 sm:col-span-2"><MapPinIcon className="size-4 text-[var(--color-primary)]" />{lesson.place}</span>
            </div>
        </article> 
    )
}