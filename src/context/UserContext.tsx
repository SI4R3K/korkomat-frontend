import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from 'react'

import { getUserDetails } from '../api/userDetailsApi'

import type {
    UserDetailsResponse,
    StudentDetailsResponse,
    TutorDetailsResponse
} from '../types/user'

type UserContextType = {
    userId: string,
    email: string,
    name: string,
    studentProfileId: string,
    tutorProfileId: string,

    getDetails: () => Promise<UserDetailsResponse>
}

const UserContext = createContext<
    UserContextType | undefined
>(undefined)

type UserDetailsProviderProps = {
    children: ReactNode
}

export function UserDetailsProvider({
    children,
}: UserDetailsProviderProps) {
    const [userId, setUserId] = useState<string | null>(() => {
        return localStorage.getItem(
            'userId'
        )
    })

    const [email, setEmail] = useState<string | null>(() => {
        return localStorage.getItem(
            'email'
        )
    })

    const [name, setName] = useState<string | null>(() => {
        return localStorage.getItem(
            'name'
        )
    })

    const [studentProfile, setStudentProfile] = useState<string | null>(() => {
        return localStorage.getItem(
            'studentProfileId'
        )
    })

    const [tutorProfile, setTutorProfile] = useState<string | null>(() => {
        return localStorage.getItem(
            'tutorProfileId'
        )
    })

    const getDetails = async (
    ): Promise<UserDetailsResponse> => {
        const response = 
            await getUserDetails()
        
        localStorage.setItem(
            'userId',
            response.id
        )

        
        localStorage.setItem(
            'name',
            response.name
        )

        
        localStorage.setItem(
            'email',
            response.email
        )

        
        localStorage.setItem(
            'studentProfileId',
            response.studentProfile.studentProfileId
        )

        localStorage.setItem(
            'tutorProfileId',
            response.tutorProfile.tutorProfileId
        )

        return response
    }
}

export function useUserDetails() {

    const context = 
        useContext(UserContext)
    
    if (!context) {
        throw new Error(
            'useUserDetails must be used inside UserDetailProvider'
        )
    }

    return context
}