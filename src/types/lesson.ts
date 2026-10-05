import type { SubjectLevel } from "./subject"

export type BookLessonRequest = {
    tutorSubjectId: number
    place?: string
}

export type BookLessonResponse = {
    message: string
}

export interface TutorGetLessons {
    lessons: TutorLesson[]
}

export interface StudentGetLessons {
    lessons: StudentLesson[]
}

export interface TutorLesson {
    id: number,
    status: LessonStatus,
    startTime: string,
    endTime: string,
    place: string,
    format: 'ONLINE' | 'IN_PERSON' | 'OPTIONAL',
    subjectName: string,
    level: SubjectLevel,
    studentName: string,
}

export interface StudentLesson {
    id: number,
    status: LessonStatus,
    startTime: string,
    endTime: string,
    place: string,
    format: 'ONLINE' | 'IN_PERSON' | 'OPTIONAL',
    subjectName: string,
    tutorName: string,
}

export type LessonStatus = 
    'PENDING'   | 
    'CONFIRMED' |
    'REJECTED'