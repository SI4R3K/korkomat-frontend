export type SubjectLevel =
    'PRIMARY_SCHOOL' 
    | 'EIGHT_GRADE_EXAM' 
    | 'HIGH_SCHOOL' 
    | 'MATURA_EXAM'
    | 'UNIVERSITY'

// types for getting subjects
export type ApiSubjectResponse = {
    subjects: Subject[]
}

export type Subject = {
    id: number
    name: string
}

export type SubjectsResponse = {
    allSubjects: SubjectResponse[]
}

export type SubjectResponse = {
    id: number,
    name: string
}

// creating tutor subjects
export type CreateTutorSubjectRequest = {
    subjectId: string,
    description: string,
    level: SubjectLevel
}

// tutor getting subjects
export type TutorSubjectResponse = {
    tutorSubjects: TutorSubject[]
}

export type TutorSubject = {
    id: string
    // tutorId: string,
    // tutorEmail: string,
    // tutorFullName: string,
    subjectId: number,
    subjectName: string
    level: SubjectLevel
    description?: string
}

// tutor updating his subjects
export type UpdateTutorSubjectRequest = {
    subjectId: number
    description: string
    level: SubjectLevel
}

// student getting tutor subjects
export type StudentTutorSubjectResponse = {
    tutorSubjects: StudentTutorSubject[]
}

export type StudentTutorSubject = {
    subjectId: number
    subjectName: string
    level: SubjectLevel
    description: string
}