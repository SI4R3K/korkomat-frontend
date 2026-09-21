export type TutorSubject = {
    id: number,
    level: 'PRIMARY_SCHOOL' |
        'EIGHT_GRADE_EXAM' |
        'HIGH_SCHOOL' |
        'MATURA_EXAM' |
        'UNIVERSITY',
    levels: TutorSubject['level'][]
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
