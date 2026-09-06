export type UserDetailsResponse = {
    id: string,
    email: string,
    name?: string,
    fullName?: string,
    studentProfile: StudentDetailsResponse | null,
    tutorProfile: TutorDetailsResponse | null,
}

export type StudentDetailsResponse = {
    id: string,
}

export type TutorDetailsResponse = {
    id: string,
}