import { useEffect, useState } from "react"
import { BookOpenIcon, CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { studentGetTutorsSubjects } from "../../../api/subjectApi"
import { studentBookLesson } from "../../../api/lessonApi"
import type { AvailableSlot } from "../../../types/availableSlot"
import type { TutorSubjectPayload } from "../../../types/subject"

interface ReservationFromProps {
    slot: AvailableSlot
    onClose: () => void
}

function ReservationForm({
    slot,
    onClose,
}: ReservationFromProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedSubject, setSelectedSubject] = useState<TutorSubjectPayload | null>(null)
    const [place, setPlace] = useState('')
    const [bookingError, setBookingError] = useState('')
    const [isBooking, setIsBooking] = useState(false)
    const [tutorsSubjectsError, setTutorsSubjectsError] = useState('')
    const [loadedTutorSubjects, setLoadedTutorSubjects] = useState<TutorSubjectPayload[] | null>(null)
    const [isLoadingTutorsSubjects, setIsLoadingTutorsSubjects] = useState(true)

    const toggleMenu = () => {
        setIsOpen((currentValue) => !currentValue)
    }

    const selectSubject = (subject: TutorSubjectPayload) => {
        setSelectedSubject(subject)
        setIsOpen(false)
    }

    const formatLevel = (level: string) => level.replaceAll('_', ' ').toLowerCase().replace(/(^|\s)\S/g, (letter) => letter.toUpperCase())

    const availableSubjects = loadedTutorSubjects ?? []

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!selectedSubject) {
            setBookingError('Select a subject before booking the lesson.')
            return
        }

        try {
            setBookingError('')
            setIsBooking(true)
            await studentBookLesson(slot.id, {
                tutorSubjectId: selectedSubject.subjectId,
                place: place.trim() || undefined,
            })
            onClose()
        } catch (error) {
            setBookingError(error instanceof Error ? error.message : 'Could not book the lesson.')
        } finally {
            setIsBooking(false)
        }
    }

    useEffect(() => {
        const loadTutorsSubjects = async(tutorId?: string) => {

            if (!tutorId) {
                setLoadedTutorSubjects([])
                setTutorsSubjectsError('Tutor information is unavailable.')
                setIsLoadingTutorsSubjects(false)
                return
            }

            try {
                setTutorsSubjectsError('')
                const response = await studentGetTutorsSubjects(tutorId)
                setLoadedTutorSubjects(response)
                if (response.length === 0) {
                    setTutorsSubjectsError('Selected tutor has not provided any subjects yet.')
                }

            } catch (error) {
                setTutorsSubjectsError(error instanceof Error ? error.message : 'Could not load tutors subjects.')
            } finally {
                setIsLoadingTutorsSubjects(false)
            }
        }
        void loadTutorsSubjects(slot.tutorProfileId)
    }, [slot.tutorProfileId])

    return (
        <div>
            <div>
                <label className="mt-6 flex flex-col gap-2 text-sm font-bold text-[var(--color-text-primary)]" htmlFor="tutor-subject-picker">
                    Select a subject
                    <span className="font-normal text-[var(--color-text-secondary)]">Choose what you want to work on with this tutor.</span>
                </label>
                <div className="relative mt-2">
                    <button
                        id="tutor-subject-picker"
                        type="button"
                        aria-controls="tutor-subject-menu"
                        aria-expanded={isOpen}
                        onClick={toggleMenu}
                        className={`flex w-full items-center justify-between gap-4 rounded-xl border bg-white px-3 py-2.5 text-left transition ${isOpen ? 'border-[var(--color-border-focus)]' : 'border-[var(--color-border)] hover:border-[var(--color-primary)]'}`}
                    >
                        <span className="flex min-w-0 items-center gap-3">
                            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg text-[var(--color-primary)]">
                                <BookOpenIcon className="size-4" />
                            </span>
                            <span className="min-w-0">
                                <span className="block truncate font-bold text-[var(--color-text-primary)]">{selectedSubject?.subjectName ?? 'Choose a tutor subject'}</span>
                                <span className="mt-0.5 block truncate text-xs font-normal text-[var(--color-text-secondary)]">{selectedSubject ? 'Subject selected' : `${availableSubjects.length} ${availableSubjects.length === 1 ? 'subject' : 'subjects'} available`}</span>
                            </span>
                        </span>
                        <ChevronDownIcon className={`size-5 shrink-0 text-[var(--color-text-secondary)] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <div id="tutor-subject-menu" className={`absolute inset-x-0 top-[calc(100%+6px)] z-10 origin-top overflow-hidden rounded-xl border border-[var(--color-border)] bg-white shadow-[0_8px_20px_rgb(25_43_58/10%)] transition-all duration-200 ${isOpen ? 'max-h-80 scale-y-100 opacity-100' : 'pointer-events-none max-h-0 scale-y-95 opacity-0'}`}>
                        <div className="max-h-80 overflow-y-auto p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {isLoadingTutorsSubjects ? (
                                <div className="px-4 py-8 text-center" role="status">
                                    <p className="m-0 text-sm text-[var(--color-text-secondary)]">Loading tutor subjects...</p>
                                </div>
                            ) : tutorsSubjectsError ? (
                                <div className="px-4 py-8 text-center" role="alert">
                                    <p className="m-0 text-sm text-[var(--color-danger)]">{tutorsSubjectsError}</p>
                                </div>
                            ) : (
                                availableSubjects.map((subject) => {
                                    const isSelected = selectedSubject?.subjectId === subject.subjectId

                                    return (
                                        <button key={subject.subjectId} type="button" onClick={() => selectSubject(subject)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 mr-1 mt-1 text-left transition ${isSelected ? 'bg-[var(--color-primary-soft)]' : 'hover:bg-[var(--color-background)]'}`}>
                                            <span className="min-w-0 flex-1">
                                                <span className="block font-bold text-[var(--color-text-primary)]">{subject.subjectName}</span>
                                                <span className="mt-0.5 block text-xs text-[var(--color-text-secondary)]">
                                                    {subject.level ? formatLevel(subject.level) : 'Level not provided'}
                                                </span>
                                            </span>
                                            {isSelected && <CheckIcon className="size-4 shrink-0 text-[var(--color-primary)]" />}
                                        </button>
                                    )
                                })
                            )}
                        </div>
                    </div>
                {selectedSubject && (
                    <div className="mt-3 rounded-2xl border border-[var(--color-primary)] bg-[var(--color-primary-soft)] p-4">
                        <div className="flex items-center justify-between gap-3">
                            <p className="m-0 text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-primary)]">About this subject</p>
                            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-[var(--color-text-secondary)]">Preview</span>
                        </div>
                        <h3 className="mb-0 mt-2 text-base font-bold text-[var(--color-text-primary)]">{selectedSubject.subjectName}</h3>
                        <p className="mb-0 mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">{selectedSubject.description || 'This tutor has not added a description yet.'}</p>
                    </div>
                )}
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <label className="mt-6 flex flex-col gap-2 text-sm font-bold text-[var(--color-text-primary)]" htmlFor="lesson-place">
                    Lesson place <span className="font-normal text-[var(--color-text-secondary)]">(optional)</span>
                    <input id="lesson-place" maxLength={255} value={place} onChange={(event) => setPlace(event.target.value)} placeholder="For example, online or Main Street 12" className="rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 font-normal outline-none focus:border-[var(--color-border-focus)] focus:ring-4 focus:ring-[var(--color-primary-soft)]" />
                </label>
                <label className="mt-6 flex flex-col gap-2 text-sm font-bold text-[var(--color-text-primary)]" htmlFor="lesson-place">
                    Add a note <span className="font-normal text-[var(--color-text-secondary)]">(optional)</span>
                    <textarea id="reservation-note" rows={4} maxLength={500} placeholder="Tell the tutor what you would like to focus on..." className="resize-y rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 font-normal outline-none focus:border-[var(--color-border-focus)] focus:ring-4 focus:ring-[var(--color-primary-soft)]" />
                </label>
                {bookingError && <p className="mb-0 mt-4 text-sm text-[var(--color-danger)]" role="alert">{bookingError}</p>}
                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button type="button" onClick={onClose} disabled={isBooking} className="rounded-xl border border-[var(--color-border)] px-5 py-3 font-bold text-[var(--color-text-primary)] transition hover:bg-[var(--color-background)] disabled:cursor-not-allowed disabled:opacity-50">Cancel</button>
                    <button type="submit" disabled={!selectedSubject || isBooking} className="rounded-xl bg-[var(--color-primary)] px-5 py-3 font-bold text-white transition hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:opacity-50">{isBooking ? 'Booking...' : 'Request lesson'}</button>
                </div>
            </form>
        </div>
    )
}

export default ReservationForm