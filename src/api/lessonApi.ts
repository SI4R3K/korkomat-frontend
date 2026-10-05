import type { BookLessonRequest, BookLessonResponse, LessonStatus, StudentGetLessons, TutorGetLessons } from "../types/lesson"
import { apiClient } from "./client"


export async function studentBookLesson(slotId: number, request: BookLessonRequest): Promise<BookLessonResponse> {
    const endpoint = `/student/lessons/${slotId}`

    const data = await apiClient<BookLessonResponse>(endpoint, {
        method: 'POST',
        body: JSON.stringify(request),
    })

    return data
}

export async function tutorGetLessons(lessonStatus: LessonStatus): Promise<TutorGetLessons> {
    const endpoint = `/tutor/lessons?status=${lessonStatus}`

    const data = await apiClient<TutorGetLessons>(endpoint, {
        method: 'GET',
    })

    return data 
}

export async function tutorAcceptReservation(
    lessonId: number
) {
    const endpoint = `/tutor/lessons/${lessonId}/confirm`

    await apiClient<unknown>(endpoint, {
        method: 'PATCH',
    })

    // API return details about the lesson, for now not necessary
}

export async function tutorRejectReservation(
    lessonId: number
) {
    const endpoint = `/tutor/lessons/${lessonId}/reject`

    await apiClient<unknown>(endpoint, {
        method: 'PATCH',
    })

    // API return details about the lesson, for now not necessary
}

export async function studentGetLessons(lessonStatus: LessonStatus): Promise<StudentGetLessons> {
    const endpoint = `/student/lessons?status=${lessonStatus}`

    const data = await apiClient<StudentGetLessons>(endpoint, {
        method: 'GET',
    })

    return data 
}

