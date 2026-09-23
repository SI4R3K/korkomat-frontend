import { XMarkIcon } from '@heroicons/react/24/outline'

interface ReservationHeaderProps {
    onClose: () => void
}

function ReservationHeader({
    onClose
}: ReservationHeaderProps) {
    return (
        <div className="flex items-start justify-between gap-4">
            <div>
                <p className="m-0 text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-primary)]">Lesson reservation</p>
                <h2 id="reservation-title" className="mb-0 mt-2 text-2xl font-bold text-[var(--color-text-primary)]">Request this lesson</h2>
            </div>
            <button type="button" onClick={onClose} aria-label="Close reservation dialog" className="rounded-full p-2 text-[var(--color-text-secondary)] transition hover:bg-[var(--color-background)] hover:text-[var(--color-text-primary)]">
                <XMarkIcon className="size-6" />
            </button>
        </div>
    )
}

export default ReservationHeader