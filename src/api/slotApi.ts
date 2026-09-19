import { apiClient } from "./client";

import type { AvailableSlotApiItem, AvailableSlotsResponse, CreateAvailableSlotRequest } from '../types/availableSlot'

function isSlotItem(value: unknown): value is AvailableSlotApiItem {
    if (!value || typeof value !== 'object') {
        return false
    }

    const item = value as Record<string, unknown>
    return typeof item.startTime === 'string' && typeof item.endTime === 'string'
}

function findSlotCollection(value: unknown): unknown[] | null {
    if (Array.isArray(value)) {
        return value.length === 0 || value.some(isSlotItem) ? value : null
    }

    if (!value || typeof value !== 'object') {
        return null
    }

    const object = value as Record<string, unknown>
    const preferredKeys = ['allAvailableSlots', 'availableSlots', 'availableSlot', 'slots', 'content']

    for (const key of preferredKeys) {
        const collection = findSlotCollection(object[key])
        if (collection) {
            return collection
        }
    }

    for (const nestedValue of Object.values(object)) {
        const collection = findSlotCollection(nestedValue)
        if (collection) {
            return collection
        }
    }

    return null
}

function normalizeAvailableSlots(payload: unknown): AvailableSlotsResponse {
    const slots = findSlotCollection(payload) ?? []

    return { allAvailableSlots: slots as AvailableSlotApiItem[] }
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
