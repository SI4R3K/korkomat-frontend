import { apiClient } from "./client";

import { type Subject } from "../types/subject";

type SubjectResponse = {
    data: {
        subjects: Subject[]
    }
}

export async function tutorGetSubjects(): Promise<Subject[]> {
    const endpoint = '/tutor/subjects'

    const response = await apiClient(endpoint, {
        method: 'GET',
    })

    if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Getting available slots failed')
    }

    const payload: SubjectResponse = await response.json()
    
    return payload.data.subjects
}