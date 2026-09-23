export type AvailableSlot = {
    id: number
    tutorId: string
    tutor: string
    subject: string
    date: string
    dateLabel?: string
    time: string
    format: 'Online' | 'In person' | 'Any'
    location: string
}

export type AvailableSlotApiItem = {
    slotId: number
    tutorId: string
    tutorName: string
    startTime: string
    endTime: string
    type: 'ONLINE' | 'IN_PERSON' | 'OPTIONAL'
}

export type AvailableSlotsResponse = {
    allAvailableSlots: AvailableSlotApiItem[]
}

export type CreateAvailableSlotRequest = {
    startTime: string
    endTime: string
    type: AvailableSlotApiItem['type']
}