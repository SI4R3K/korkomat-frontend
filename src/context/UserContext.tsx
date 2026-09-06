import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from 'react'

import { getUserDetails } from '../api/userDetailsApi'

import type {
    UserDetailsResponse,
} from '../types/user'

type UserContextType = {
    userId: string | null,
    email: string | null,
    fullName: string | null,
    studentProfileId: string | null,
    tutorProfileId: string | null,

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

    const [fullName, setName] = useState<string | null>(() => {
        return localStorage.getItem(
            'fullName'
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
        setUserId(response.id)

        
        const fullName = response.fullName ?? response.name ?? null

        if (fullName) {
            localStorage.setItem('fullName', fullName)
        } else {
            localStorage.removeItem('fullName')
        }
        setName(fullName)

        
        localStorage.setItem(
            'email',
            response.email
        )
        setEmail(response.email)

        
        const studentProfileId = response.studentProfile?.id ?? null
        const tutorProfileId = response.tutorProfile?.id ?? null

        if (studentProfileId) {
            localStorage.setItem('studentProfileId', studentProfileId)
        } else {
            localStorage.removeItem('studentProfileId')
        }
        setStudentProfile(studentProfileId)

        if (tutorProfileId) {
            localStorage.setItem('tutorProfileId', tutorProfileId)
        } else {
            localStorage.removeItem('tutorProfileId')
        }
        setTutorProfile(tutorProfileId)

        return response
    }

    return (
        <UserContext.Provider
            value={{
                userId,
                email,
                fullName,
                studentProfileId: studentProfile,
                tutorProfileId: tutorProfile,
                getDetails,
            }}
        >
            {children}
        </UserContext.Provider>
    )
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