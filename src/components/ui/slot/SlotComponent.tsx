import {
    CalendarDaysIcon,
    ClockIcon,
    MapPinIcon,
} from '@heroicons/react/24/outline'

import type { AvailableSlot } from "../../../types/availableSlot"

type SlotComponentsProps = {
    slot: AvailableSlot,
    showBookingScreen?: () => void
}

function SlotComponent({
    slot,
    showBookingScreen,
}: SlotComponentsProps) {
    return (
        <article className="rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-[0_8px_24px_rgb(25_43_58/5%)] transition hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:shadow-[0_12px_28px_rgb(25_43_58/10%)]">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="m-0 text-sm font-bold uppercase tracking-[0.06em] text-[var(--color-primary)]">{slot.subject}</p>
                    <h3 className="mb-0 mt-2 text-xl font-bold text-[var(--color-text-primary)]">
                        {slot.tutor === 'Unknown tutor' ? '' : slot.tutor}
                    </h3>
                </div>
                <span className="rounded-full bg-[var(--color-primary-soft)] px-3 py-1 text-xs font-bold text-[var(--color-primary)]">{slot.format}</span>
            </div>
            <div className="mt-5 grid gap-3 text-sm text-[var(--color-text-secondary)] sm:grid-cols-2">
                <span className="flex items-center gap-2"><CalendarDaysIcon className="size-4 text-[var(--color-primary)]" />{slot.dateLabel ?? slot.date}</span>
                <span className="flex items-center gap-2"><ClockIcon className="size-4 text-[var(--color-primary)]" />{slot.time}</span>
                <span className="flex items-center gap-2 sm:col-span-2"><MapPinIcon className="size-4 text-[var(--color-primary)]" />{slot.location}</span>
            </div>
            {showBookingScreen && <button onClick={showBookingScreen} type="button" className="mt-5 w-full rounded-xl bg-[var(--color-primary)] px-4 py-3 font-bold text-white transition hover:bg-[var(--color-primary-hover)]">Book lesson</button>}
        </article>       
    )
}

export default SlotComponent