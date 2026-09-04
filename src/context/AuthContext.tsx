import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from 'react'

import { login as loginRequest} from '../api/authApi'
import type {
    LoginRequest,
    LoginResponse
} from '../types/login'

type AuthContextType = {
    accessToken: string | null
    
    isAuthenticated: boolean

    login: (
        request: LoginRequest,
    ) => Promise<LoginResponse>

    logout: () => void
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
    const [accessToken, setAccessToken] =
        useState<string | null>(() => {
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

        setAccessToken(
            response.accessToken
        )

        return response
    }

    const logout = () => {
        localStorage.removeItem(
            'accessToken',
        )

        setAccessToken(null)
    }

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                isAuthenticated,
                login,
                logout
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

