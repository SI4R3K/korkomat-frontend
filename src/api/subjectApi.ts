import { apiClient } from "./client";
import { ApiError } from "./ApiError";

import type { 
    Subject, 
    TutorSubject,
    CreateTutorSubjectRequest,
    ApiSubjectResponse,
    TutorSubjectResponse,
    StudentTutorSubjectResponse,
    StudentTutorSubject,
    UpdateTutorSubjectRequest,
} from "../types/subject";


export async function tutorGetSubjects(): Promise<Subject[]> {
    const endpoint = '/tutor/subjects'

    const payload = await apiClient<ApiSubjectResponse>(endpoint, {
        method: 'GET',
    })

    return payload.subjects
}

export async function tutorGetMyTutorSubjects(): Promise<TutorSubject[]> {
    const endpoint = '/tutor/subjects/my'

    const payload = await apiClient<TutorSubjectResponse>(endpoint, {
        method: 'GET',
    })

    return payload.tutorSubjects
}

export async function tutorAddMyTutorSubject(tutorSubject: CreateTutorSubjectRequest): Promise<void> {
    const endpoint = '/tutor/subjects'

    await apiClient<unknown>(endpoint, {
        method: 'POST',
        body: JSON.stringify(tutorSubject),
    })
}

export async function tutorDeleteMyTutorSubject(tutorSubjectId: string) {
    const endpoint = `/tutor/subjects/${tutorSubjectId}`

    try {
        await apiClient<unknown>(endpoint, {
            method: 'DELETE',
        })
    } catch (error) {
        if (!(error instanceof ApiError)) {
            throw error
        }

        let backendMessage = error.message
        try {
            const payload = JSON.parse(error.message) as { message?: string }
            backendMessage = payload.message ?? error.message
        } catch {}

        if (
            backendMessage.includes('violates foreign key constraint') &&
            backendMessage.includes('on table "lessons"')
        ) {
            throw new ApiError(
                'This subject cannot be deleted because it is linked to a lesson, including reserved or upcoming lessons.',
                error.errorStatus,
            )
        }

        throw error
    }

    // In case it is neede such response dto is returned from the backend
    // data class DeleteTutorSubjectResponse(
    //     val message: String,
    // )
}

export async function tutorUpdateMyTutorSubject(
    tutorSubjectId: number, 
    updatedTutorSubject: UpdateTutorSubjectRequest,
): Promise<void> {
    const endpoint = `/tutor/subjects/${tutorSubjectId}`

    await apiClient<unknown>(endpoint, {
        method: 'PUT',
        body: JSON.stringify(updatedTutorSubject),
    })
}

export async function studentGetTutorsSubjects(tutorId: string): Promise<StudentTutorSubject[]> {
    const endpoint = `/student/subjects/${tutorId}`

    const payload = await apiClient<StudentTutorSubjectResponse>(endpoint, {
        method: 'GET',
    })

    return payload.tutorSubjects
}