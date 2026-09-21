export type SubjectLevel =
    'PRIMARY_SCHOOL' |
    'EIGHT_GRADE_EXAM' |
    'HIGH_SCHOOL' |
    'MATURA_EXAM' |
    'UNIVERSITY'

export type TutorSubject = {
    id: number,
    subjectName: string,
    level: SubjectLevel | null,
    levels: SubjectLevel[],
    description: string
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
