import {
    CalendarDaysIcon,
    ClockIcon,
    MapPinIcon,
} from '@heroicons/react/24/outline'
import type { AvailableSlot } from "../../../types/availableSlot"

type TutorSlotComponentProps = {
    slot: AvailableSlot
    slotLabel?: string
    deletingSlotId: number | null
    onDelete: (slotId: number) => void
}

function TutorSlotComponent({
    slot,
    slotLabel,
    deletingSlotId,
    onDelete
}: TutorSlotComponentProps) {
    const isDeleting = deletingSlotId === slot.id
    const isDeletingDisabled = deletingSlotId != null

    return (
        <article className="rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-[0_8px_24px_rgb(25_43_58/5%)] transition hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:shadow-[0_12px_28px_rgb(25_43_58/10%)]">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="m-0 text-lg font-bold uppercase tracking-[0.06em] text-[var(--color-primary)]">{slotLabel ?? 'Available slot'}</p>
                </div>
            </div>
            <div className="mt-5 grid gap-3 text-sm text-[var(--color-text-secondary)] sm:grid-cols-2">
                <span className="flex items-center gap-2">
                    <CalendarDaysIcon className="size-4 shrink-0 text-[var(--color-primary)]" />
                    <p className='font-bold'>
                        {slot.dateLabel ?? slot.date}
                    </p></span>
                <span className="flex items-center gap-2">
                    <ClockIcon className="size-4 shrink-0 text-[var(--color-primary)]" />
                    <p className='font-bold'>
                        {slot.time}
                    </p>    
                </span>
                <span className="flex items-center gap-2 sm:col-span-2">
                    <MapPinIcon className="size-4 shrink-0 text-[var(--color-primary)]" />
                    <p className='font-bold'>
                        {slot.location}
                    </p>
                </span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <button type="button" className="rounded-xl border border-[var(--color-border)] px-4 py-3 font-bold text-[var(--color-text-primary)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]">Edit</button>
                <button 
                    type="button" 
                    className="rounded-xl border border-red-200 px-4 py-3 font-bold text-[var(--color-danger)] transition hover:border-[var(--color-danger)] hover:bg-red-50"
                    onClick={() => onDelete(slot.id)}
                    disabled={isDeletingDisabled}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
            </div>
        </article>
    )
}

export default TutorSlotComponent