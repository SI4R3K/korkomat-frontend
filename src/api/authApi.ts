import { apiClient } from "./client";
import type { 
    LoginRequest, 
    LoginResponse, 
    LogoutRequest,
    RegisterRequest,
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