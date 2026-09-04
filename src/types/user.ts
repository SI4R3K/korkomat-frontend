export type UserDetailsResponse = {
    id: string,
    email: string,
    name: string,
    studentProfile: StudentDetailsResponse,
    tutorProfile: TutorDetailsResponse, 
}

export type StudentDetailsResponse = {
    studentProfileId: string,
}

export type TutorDetailsResponse = {
    tutorProfileId: string,
}