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
    startTime: string,
    endTime: string,
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

export type UpdateAvailableSlotRequest = {
    // slotId: number
    startTime?: string
    endTime?: string
    type?: 'ONLINE' | 'IN_PERSON' | 'OPTIONAL'
}