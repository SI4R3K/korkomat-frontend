import { apiClient } from "./client";
import type { 
    ForgotPasswordRequest,
    LoginRequest, 
    LoginResponse, 
    LogoutRequest,
    RegisterRequest,
    ResetPasswordRequest,
} from '../types/auth';

type LoginPayload = {
    accessToken?: string
    refreshToken?: string
    tokenType?: string
    expiresIn?: number
}

export async function login(
    request: LoginRequest,
): Promise<LoginResponse> {

    const data = await apiClient<LoginPayload>(
        '/auth/login',
        {
            method: 'POST',
            body: JSON.stringify(request),
        },
    )

    const accessToken = data.accessToken
    const refreshToken = data.refreshToken
    const tokenType = data.tokenType ?? 'Bearer'

    if (!accessToken || !refreshToken) {
        throw new Error(
            'Login response does not contain accessToken and refreshToken'
        )
    }

    return {
        accessToken,
        refreshToken,
        tokenType,
        expiresIn: data.expiresIn ?? 0,
    }
}

export async function register(request: RegisterRequest): Promise<void> {
    await apiClient<null>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(request),
    })
}

export async function logout(
    request: LogoutRequest,
): Promise<void> {
    
    await apiClient<null>(
        '/auth/logout',
        {
            method: 'POST',

            body: JSON.stringify(
                request
            ),
        },
    )
}

export async function verifyEmail(
    token: string | null
) {
    const endpoint = `/auth/verify?token=${token}`

    await apiClient<null>(endpoint, {
        method: 'GET'
    })
}

export async function forgotPassword(
    request: ForgotPasswordRequest
): Promise<any> {

    const endpoint = '/auth/forgot-password'

    await apiClient<null>(endpoint,{
        method: 'POST',

        body: JSON.stringify(
            request
        ),
    })
}

export async function resetPassword(
    request: ResetPasswordRequest
): Promise<any> {
    const endpoint = '/auth/reset-password'

    const data = await apiClient<any>(endpoint,{
        method: 'POST',

        body: JSON.stringify(
            request
        ),
    })

    return data
} 