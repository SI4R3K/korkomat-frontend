import { apiClient } from './client'

import type { AvailableSlotsResponse, CreateAvailableSlotRequest } from '../types/availableSlot'

function normalizeAvailableSlots(payload: unknown): AvailableSlotsResponse {
    const data = (payload as { data?: { allAvailableSlots?: unknown; availableSlots?: unknown } } | undefined)?.data ?? payload
    const resolvedData = data as { allAvailableSlots?: unknown[]; availableSlots?: unknown[] }

    const allAvailableSlots = Array.isArray(resolvedData.allAvailableSlots)
        ? resolvedData.allAvailableSlots
        : Array.isArray(resolvedData.availableSlots)
            ? resolvedData.availableSlots
            : []

    return { allAvailableSlots: allAvailableSlots as AvailableSlotsResponse['allAvailableSlots'] }
}

export async function studentGetSlots(): Promise<AvailableSlotsResponse> {
    const endpoint = '/student/available-slot/search'

    const response = await apiClient(endpoint, {
        method: 'GET',
    })

    if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Getting available slots failed')
    }

    return normalizeAvailableSlots(await response.json())
}

export async function tutorGetSlots(): Promise<AvailableSlotsResponse> {
    const endpoint = '/tutor/available-slot'

    const response = await apiClient(endpoint, {
        method: 'GET',
    })

    if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Getting available slots failed')
    }

    return normalizeAvailableSlots(await response.json())
}

export async function tutorCreateSlot(slot: CreateAvailableSlotRequest): Promise<void> {
    const response = await apiClient('/tutor/available-slot', {
        method: 'POST',
        body: JSON.stringify(slot),
    })

    if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Creating available slot failed')
    }
}
