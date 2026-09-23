import { apiClient } from "./client";

import type { Subject, SubjectLevel, TutorSubject, CreateTutorSubjectRequest } from "../types/subject";

type SubjectResponse = {
    data: {
        subjects: Subject[]
    }
}

type TutorSubjectResponse = {
    data: {
        tutorSubjects: TutorSubjectPayload[]
    }
}

type TutorSubjectPayload = {
    id: number
    subjectName: string
    level?: SubjectLevel | SubjectLevel[]
    levels?: SubjectLevel[]
    description: string
}

export async function tutorGetSubjects(): Promise<Subject[]> {
    const endpoint = '/tutor/subjects'

    const response = await apiClient(endpoint, {
        method: 'GET',
    })

    if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Getting subjects failed')
    }

    const payload: SubjectResponse = await response.json()
    
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
        const levels = tutorSubject.levels
            ?? (Array.isArray(tutorSubject.level) ? tutorSubject.level : tutorSubject.level ? [tutorSubject.level] : [])

        return {
            ...tutorSubject,
            level: levels[0] ?? null,
            levels,
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

export async function studentGetTutorsSubjects(tutorId: string): Promise<TutorSubject[]> {
    const endpoint = `/student/subjects/${tutorId}`

    const response = await apiClient(endpoint, {
        method: 'GET',
    })

    if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Getting tutor subjects failed')
    }

    const payload: TutorSubjectResponse = await response.json()
    
    return payload.data.tutorSubjects.map((tutorSubject) => {
        const levels = tutorSubject.levels
            ?? (Array.isArray(tutorSubject.level) ? tutorSubject.level : tutorSubject.level ? [tutorSubject.level] : [])

        return {
            ...tutorSubject,
            level: levels[0] ?? null,
            levels,
        }
    })
}