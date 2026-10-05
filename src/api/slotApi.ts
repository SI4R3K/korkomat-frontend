import { apiClient } from './client'

import type { 
    AvailableSlotsResponse,
    CreateAvailableSlotRequest, 
    UpdateAvailableSlotRequest 
} from '../types/availableSlot'

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

    const payload = await apiClient<unknown>(endpoint, {
        method: 'GET',
    })

    return normalizeAvailableSlots(payload)
}

export async function tutorGetSlots(): Promise<AvailableSlotsResponse> {
    const endpoint = '/tutor/available-slot'

    const payload = await apiClient<unknown>(endpoint, {
        method: 'GET',
    })

    return normalizeAvailableSlots(payload)
}

export async function tutorCreateSlot(slot: CreateAvailableSlotRequest): Promise<void> {
    await apiClient<unknown>('/tutor/available-slot', {
        method: 'POST',
        body: JSON.stringify(slot),
    })
}

export async function tutorDeleteSlot(slotId: number): Promise<void> {
    const endpoint = `/tutor/available-slot/${slotId}`

    await apiClient<unknown>(endpoint, {
        method: 'DELETE'
    })
    // such DTO is in response
    // public final data class DeleteAvailableSlotsResponse(
    //  public final val message: String,
    //  public final val deletedAvailableSlot: AvailableSlotResponse
    // )
    // for now use of it is not neede therefore we dont use it
}

export async function tutorUpdateSlot(slotId: number, slot: UpdateAvailableSlotRequest): Promise<void> {
    const endpoint = `/tutor/available-slot/${slotId}`

    await apiClient<unknown>(endpoint, {
        method: 'PUT',
        body: JSON.stringify(slot),
    })
}