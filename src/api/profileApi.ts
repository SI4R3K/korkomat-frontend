import { apiClient } from './client'
import type { ProfileRequest, RegisterProfileResponse } from '../types/auth'

export type ProfileType = 'student' | 'tutor'

export async function createProfile(
    profileType: ProfileType,
    request: ProfileRequest,
): Promise<void> {
    const endpoint = profileType === 'student'
        ? '/user/register/student'
        : '/user/register/tutor'
    await apiClient<RegisterProfileResponse>(endpoint, {
        method: 'POST',
        body: JSON.stringify(request),
    })
}