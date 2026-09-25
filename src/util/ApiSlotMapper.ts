
import type { AvailableSlotApiItem } from "../types/availableSlot"
import type { AvailableSlot } from "../types/availableSlot"

function mapApiSlot(slot: AvailableSlotApiItem): AvailableSlot {
    const start = new Date(slot.startTime)
    const end = new Date(slot.endTime)
    const date = slot.startTime.slice(0, 10)

    return {
        id: slot.slotId,
        tutorProfileId: slot.tutorProfileId ?? '',
        tutor: slot.tutorName ?? 'Unknown tutor',
        subject: 'Lesson',
        date,
        dateLabel: new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            timeZone: 'UTC',
        }).format(start),
        time: `${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })} - ${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })}`,
        format:
            slot.type === 'IN_PERSON'
                ? 'In person'
                : slot.type === 'ONLINE'
                    ? 'Online'
                    : 'Any',
        location: slot.type === 'IN_PERSON'
            ? 'In-person lesson'
            : slot.type === 'ONLINE'
                ? 'Online lesson'
                : 'Online or in-person lesson',
    }
}

export default mapApiSlot