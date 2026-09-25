import { apiClient } from "./client";

import type { 
    Subject,  
    TutorSubject, 
    TutorSubjectPayload,
    CreateTutorSubjectRequest,
    ApiSubjectResponse,
    TutorSubjectResponse,
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
    
    return payload.data.tutorSubjects.map((tutorSubject) => {
        return {
            id: tutorSubject.subjectId,
            subjectName: tutorSubject.subjectName,
            level: tutorSubject.level ?? null,
            description: tutorSubject.description,
        }
    })
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

export async function studentGetTutorsSubjects(tutorId: string): Promise<TutorSubjectPayload[]> {
    const endpoint = `/student/subjects/${tutorId}`

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