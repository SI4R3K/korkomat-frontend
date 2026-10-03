
import type { AvailableSlotApiItem } from "../types/availableSlot"
import type { AvailableSlot } from "../types/availableSlot"

function mapApiSlot(slot: AvailableSlotApiItem): AvailableSlot {
    const start = new Date(slot.startTime)
    const end = new Date(slot.endTime)

    const startDate = slot.startTime.slice(0, 10)
    const endDate = slot.endTime.slice(0, 10)

    const isDifferentDay = startDate !== endDate

    const diffInMs = Math.abs(Date.parse(slot.startTime.slice(0,10)) - Date.parse(slot.endTime.slice(0,10)));
    const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

    const dateFormatter = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
    })

    const timeFormatter = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'UTC',
    })

    const dateLabel = isDifferentDay
        ? `${dateFormatter.format(start)} - ${dateFormatter.format(end)}`
        : dateFormatter.format(start)

    const time = isDifferentDay
        ? diffInDays > 1 
            ? `${timeFormatter.format(start)} - ${timeFormatter.format(end)} (+${diffInDays} days)`
            : `${timeFormatter.format(start)} - ${timeFormatter.format(end)} (+${diffInDays} day)`
        : `${timeFormatter.format(start)} - ${timeFormatter.format(end)}`

    return {
        id: slot.slotId,
        tutorProfileId: slot.tutorProfileId ?? '',
        tutor: slot.tutorName ?? 'Unknown tutor',
        subject: 'Lesson',
        date: startDate,
        dateLabel,
        time,
        startTime: slot.startTime,
        endTime: slot.endTime,
        format:
            slot.type === 'IN_PERSON'
                ? 'In person'
                : slot.type === 'ONLINE'
                    ? 'Online'
                    : 'Any',
        location:
            slot.type === 'IN_PERSON'
                ? 'In-person lesson'
                : slot.type === 'ONLINE'
                    ? 'Online lesson'
                    : 'Online or in-person lesson',
    }
}

export default mapApiSlot
