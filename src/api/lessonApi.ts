import type { BookLessonRequest, BookLessonResponse, LessonStatus, StudentGetLessons, TutorGetLessons } from "../types/lesson"
import { apiClient } from "./client"


export async function studentBookLesson(slotId: number, request: BookLessonRequest): Promise<BookLessonResponse> {
    const endpoint = `/student/lessons/${slotId}`

    const response = await apiClient(endpoint, {
        method: 'POST',
        body: JSON.stringify(request),
    })

    if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Booking action failed')
    }

    const payload: BookLessonResponse = await response.json()

    return payload
}

export async function tutorGetLessons(lessonStatus: LessonStatus): Promise<TutorGetLessons> {
    const endpoint = `/tutor/lessons?status=${lessonStatus}`

    const response = await apiClient(endpoint, {
        method: 'GET',
    })

    if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Getting lessons failed')
    }

    const payload: TutorGetLessons = await response.json()
    
    return payload
}

export async function tutorAcceptReservation(
    lessonId: number
) {
    const endpoint = `/tutor/lessons/${lessonId}/confirm`

    const response = await apiClient(endpoint, {
        method: 'PATCH',
    })

    if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Confirming reservation failed')
    }

    // API return details about the lesson, for now not necessary
    // const payload: TutorGetLessons = await response.json()

    // return payload
}

export async function tutorRejectReservation(
    lessonId: number
) {
    const endpoint = `/tutor/lessons/${lessonId}/reject`

    const response = await apiClient(endpoint, {
        method: 'PATCH',
    })

    if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Rejecting reservation failed')
    }

    // API return details about the lesson, for now not necessary
    // const payload: TutorGetLessons = await response.json()

    // return payload
}

export async function studentGetLessons(lessonStatus: LessonStatus): Promise<StudentGetLessons> {
    const endpoint = `/student/lessons?status=${lessonStatus}`

    const response = await apiClient(endpoint, {
        method: 'GET',
    })

    if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Getting lessons failed')
    }

    const payload: StudentGetLessons = await response.json()
    
    return payload
}

