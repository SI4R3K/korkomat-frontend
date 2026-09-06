import { apiClient } from './client'
import type { ProfileRequest } from '../types/auth'

export type ProfileType = 'student' | 'tutor'

export async function createProfile(
    profileType: ProfileType,
    request: ProfileRequest,
): Promise<void> {
    const endpoint = profileType === 'student'
        ? '/user/register/student'
        : '/user/register/tutor'
    const response = await apiClient(endpoint, {
        method: 'POST',
        body: JSON.stringify(request),
    })

    if (!response.ok) {
        const message = await response.text()
        throw new Error(message || `Creating ${profileType} profile failed (${response.status})`)
    }
}