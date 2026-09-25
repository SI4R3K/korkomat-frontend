export type ApiResponse<T> = {
    data?: T
}

export type AvailableSlot = {
    id: number
    tutorProfileId?: string
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
    tutorProfileId?: string
    tutorName?: string
    startTime: string
    endTime: string
    type: 'ONLINE' | 'IN_PERSON' | 'OPTIONAL'
    status?: string
    lessonId?: number | null
}

export type AvailableSlotsResponse = {
    allAvailableSlots: AvailableSlotApiItem[]
}

export type CreateAvailableSlotRequest = {
    startTime: string
    endTime: string
    type: AvailableSlotApiItem['type']
}