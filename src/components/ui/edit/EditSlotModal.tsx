import type { AvailableSlot, UpdateAvailableSlotRequest } from '../../../types/availableSlot'

import Button from '../button/Button'

import { useState } from 'react'

interface EditSlotModalProps {
    currentSlot: AvailableSlot
    onEdit: (slot: UpdateAvailableSlotRequest) => void
    onClose: () => void
}

function toDateTimeLocal(value: string) {
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return value.slice(0, 16)

    const parts = Object.fromEntries(new Intl.DateTimeFormat('en-CA', {
        timeZone: 'UTC',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
    }).formatToParts(date).map(({ type, value: partValue }) => [type, partValue]))

    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`
}

function EditSlotModal({
    currentSlot,
    onEdit,
    onClose
}: EditSlotModalProps) {
    const [updatedSlot, setUpdatedSlot] = useState<UpdateAvailableSlotRequest>({
        startTime: toDateTimeLocal(currentSlot.startTime),
        endTime: toDateTimeLocal(currentSlot.endTime),
        type: currentSlot.format === 'Online'
            ? 'ONLINE'
            : currentSlot.format === 'In person'
                ? 'IN_PERSON'
                : 'OPTIONAL',
    })

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgb(25_43_58/45%)] p-4 sm:p-5" role="presentation">
            <section
                aria-labelledby="edit-title"
                aria-modal="true"
                className="w-full max-w-2xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_24px_60px_rgb(25_43_58/20%)] sm:p-8"
                role="dialog"
            >
                <h2 id="edit-title" className="m-0 text-xl font-bold text-[var(--color-text-primary)] sm:text-2xl">Edit Slot</h2>
                <div className="mt-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-4 sm:p-5">
                    <h3 className="m-0 text-sm font-bold uppercase tracking-wide text-[var(--color-text-secondary)]">Current slot</h3>
                    <dl className="mb-0 mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                        <div>
                            <dt className="text-xs font-semibold uppercase text-[var(--color-text-secondary)]">Date</dt>
                            <dd className="mb-0 mt-1 font-semibold text-[var(--color-text-primary)]">{currentSlot.dateLabel ?? currentSlot.date}</dd>
                        </div>
                        <div>
                            <dt className="text-xs font-semibold uppercase text-[var(--color-text-secondary)]">Time</dt>
                            <dd className="mb-0 mt-1 font-semibold text-[var(--color-text-primary)]">{currentSlot.time}</dd>
                        </div>
                        <div>
                            <dt className="text-xs font-semibold uppercase text-[var(--color-text-secondary)]">Lesson format</dt>
                            <dd className="mb-0 mt-1 font-semibold text-[var(--color-text-primary)]">{currentSlot.format}</dd>
                        </div>
                        {/* <div>
                            <dt className="text-xs font-semibold uppercase text-[var(--color-text-secondary)]">Location</dt>
                            <dd className="mb-0 mt-1 font-semibold text-[var(--color-text-primary)]">{currentSlot.location}</dd>
                        </div> */}
                    </dl>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    <label className="flex flex-col gap-2 text-sm font-bold text-[var(--color-text-primary)]" htmlFor="slot-start-time">
                        Start time
                        <input
                            id="slot-start-time"
                            required
                            type="datetime-local"
                            value={updatedSlot.startTime ?? ''}
                            onChange={(event) => setUpdatedSlot({ ...updatedSlot, startTime: event.target.value })}
                            className="min-w-0 rounded-xl border border-[var(--color-border)] bg-white px-3 py-3 font-normal outline-none focus:border-[var(--color-border-focus)] focus:ring-4 focus:ring-[var(--color-primary-soft)]"
                        />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-bold text-[var(--color-text-primary)]" htmlFor="slot-end-time">
                        End time
                        <input
                            id="slot-end-time"
                            required
                            type="datetime-local"
                            value={updatedSlot.endTime ?? ''}
                            onChange={(event) => setUpdatedSlot({ ...updatedSlot, endTime: event.target.value })}
                            className="min-w-0 rounded-xl border border-[var(--color-border)] bg-white px-3 py-3 font-normal outline-none focus:border-[var(--color-border-focus)] focus:ring-4 focus:ring-[var(--color-primary-soft)]"
                        />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-bold text-[var(--color-text-primary)]" htmlFor="slot-type">
                        Lesson format
                        <select
                            id="slot-type"
                            value={updatedSlot.type ?? 'ONLINE'}
                            onChange={(event) => setUpdatedSlot({ ...updatedSlot, type: event.target.value as UpdateAvailableSlotRequest['type'] })}
                            className="min-w-0 rounded-xl border border-[var(--color-border)] bg-white px-3 py-3 font-normal outline-none focus:border-[var(--color-border-focus)] focus:ring-4 focus:ring-[var(--color-primary-soft)]"
                        >
                            <option value="ONLINE">Online</option>
                            <option value="IN_PERSON">In person</option>
                            <option value="OPTIONAL">Online or in person</option>
                        </select>
                    </label>
                </div>
                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button variant="danger" onClick={() => onEdit(updatedSlot)}>Save Changes</Button>
                </div>
            </section>
        </div>
    )
}

export default EditSlotModal