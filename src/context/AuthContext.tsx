import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from 'react'

import {
    login as loginRequest,
    logout as logoutRequest,
} from '../api/authApi'

import type {
    LoginRequest,
    LoginResponse,
} from '../types/auth'


type AuthContextType = {
    accessToken: string | null

    isAuthenticated: boolean

    login: (
        request: LoginRequest,
    ) => Promise<LoginResponse>

    logout: () => Promise<void>
}


const AuthContext = createContext<
    AuthContextType | undefined
>(undefined)


type AuthProviderProps = {
    children: ReactNode
}


export function AuthProvider({
    children,
}: AuthProviderProps) {

    const [
        accessToken,
        setAccessToken,
    ] = useState<string | null>(() => {
        return localStorage.getItem(
            'accessToken'
        )
    })


    const isAuthenticated =
        accessToken !== null


    const login = async (
        request: LoginRequest,
    ): Promise<LoginResponse> => {

        const response =
            await loginRequest(request)


        localStorage.setItem(
            'accessToken',
            response.accessToken
        )


        localStorage.setItem(
            'refreshToken',
            response.refreshToken
        )

        localStorage.setItem(
            'tokenType',
            response.tokenType
        )


        setAccessToken(
            response.accessToken
        )


        return response
    }


    const logout = async (): Promise<void> => {

        const refreshToken =
            localStorage.getItem(
                'refreshToken'
            )


        try {

            if (refreshToken) {

                await logoutRequest({
                    refreshToken,
                })
            }

        } catch (error) {

            console.error(
                'Backend logout failed:',
                error,
            )

        } finally {

            localStorage.removeItem(
                'accessToken'
            )


            localStorage.removeItem(
                'refreshToken'
            )

            localStorage.removeItem('tokenType')

            localStorage.removeItem('userId')
            localStorage.removeItem('email')
            localStorage.removeItem('fullName')
            localStorage.removeItem('studentProfileId')
            localStorage.removeItem('tutorProfileId')


            setAccessToken(null)
        }
    }


    return (
        <AuthContext.Provider
            value={{
                accessToken,
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth() {

    const context =
        useContext(AuthContext)


    if (!context) {
        throw new Error(
            'useAuth must be used inside AuthProvider'
        )
    }


    return context
}