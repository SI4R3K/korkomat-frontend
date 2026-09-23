import type { AvailableSlot } from "../../../types/availableSlot"

interface ReservationInfoProps {
    slot: AvailableSlot
}

function ReservationInfo({
    slot
}: ReservationInfoProps) {
    return (
        <div className="mt-6 rounded-2xl bg-[var(--color-background)] p-4">
            <p className="m-0 text-sm font-bold uppercase tracking-[0.06em] text-[var(--color-primary)]">{slot.subject}</p>
            <h3 className="mb-0 mt-1 text-lg font-bold text-[var(--color-text-primary)]">{slot.tutor}</h3>
            <dl className="mt-4 grid gap-3 text-sm text-[var(--color-text-secondary)] sm:grid-cols-2">
                <div><dt className="font-bold text-[var(--color-text-primary)]">Date</dt><dd className="m-0">{slot.dateLabel ?? slot.date}</dd></div>
                <div><dt className="font-bold text-[var(--color-text-primary)]">Time</dt><dd className="m-0">{slot.time}</dd></div>
                <div><dt className="font-bold text-[var(--color-text-primary)]">Format</dt><dd className="m-0">{slot.format}</dd></div>
                <div><dt className="font-bold text-[var(--color-text-primary)]">Location</dt><dd className="m-0">{slot.location}</dd></div>
            </dl>
        </div>
    )
}

export default ReservationInfo