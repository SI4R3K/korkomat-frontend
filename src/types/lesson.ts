import type { SubjectLevel } from "./subject"

export type BookLessonRequest = {
    tutorSubjectId: number
    place?: string
}

export type BookLessonResponse = {
    data: {
        message: string
    }
}

export interface TutorGetLessons {
    data: {
        lessons: TutorLesson[]
    }
}

export interface StudentGetLessons {
    data: {
        lessons: StudentLesson[]
    }
}

export interface TutorLesson {
    id: number,
    status: LessonStatus,
    startTime: string,
    endTime: string,
    place: string,
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
    subjectName: string,
    tutorName: string,
}

export type LessonStatus = 
    'PENDING'   | 
    'CONFIRMET' |
    'REJECTED'