import { apiClient } from "./client";

import type { 
    Subject, 
    TutorSubject,
    CreateTutorSubjectRequest,
    ApiSubjectResponse,
    TutorSubjectResponse,
    StudentTutorSubjectResponse,
    StudentTutorSubject,
} from "../types/subject";


export async function tutorGetSubjects(): Promise<Subject[]> {
    const endpoint = '/tutor/subjects'

    const response = await apiClient(endpoint, {
        method: 'GET',
    })

    if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Getting subjects failed')
    }

    const payload: ApiSubjectResponse = await response.json()
    
    return payload.data.subjects
}

export async function tutorGetMyTutorSubjects(): Promise<TutorSubject[]> {
    const endpoint = '/tutor/subjects/my'

    const response = await apiClient(endpoint, {
        method: 'GET',
    })

    if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Getting tutor subjects failed')
    }

    const payload: TutorSubjectResponse = await response.json()
    
    return payload.data.tutorSubjects
}

export async function tutorAddMyTutorSubject(tutorSubject: CreateTutorSubjectRequest): Promise<void> {
    const endpoint = '/tutor/subjects'

    const response = await apiClient(endpoint, {
        method: 'POST',
        body: JSON.stringify(tutorSubject),
    })

    if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Creating tutor subject failed')
    }
}

export async function tutorDeleteMyTutorSubject(tutorSubjectId: string) {
    const endpoint = `/tutor/subjects/${tutorSubjectId}`

    const response = await apiClient(endpoint, {
        method: 'DELETE',
    })

    if (!response.ok) {
        const message = await response.text()
        let backendMessage = ''
        try {
            const payload = JSON.parse(message) as { message?: string }
            backendMessage = payload.message ?? ''
        } catch {}

        if (
            backendMessage.includes('violates foreign key constraint') &&
            backendMessage.includes('on table "lessons"')
        ) {
            throw new Error('This subject cannot be deleted because it is linked to a lesson, including reserved or upcoming lessons.')
        }

        throw new Error(message || 'Deleting tutor subject failed')
    }

    // In case it is neede such response dto is returned from the backend
    // data class DeleteTutorSubjectResponse(
    //     val message: String,
    // )
}

export async function studentGetTutorsSubjects(tutorId: string): Promise<StudentTutorSubject[]> {
    const endpoint = `/student/subjects/${tutorId}`

    const response = await apiClient(endpoint, {
        method: 'GET',
    })

    if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Getting tutor subjects failed')
    }

    const payload: StudentTutorSubjectResponse = await response.json()

    return payload.data.tutorSubjects
}