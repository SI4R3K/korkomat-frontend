import { apiClient } from "./client";
import type { 
    LoginRequest, 
    LoginResponse, 
    LogoutRequest,
    RegisterRequest,
} from '../types/auth';

async function ensureSuccessfulResponse(response: Response, action: string) {
    if (!response.ok) {
        const message = await response.text()
        throw new Error(message || `${action} failed (${response.status})`)
    }
}

export async function login(
    request: LoginRequest,
): Promise<LoginResponse> {

    const response = await apiClient(
        '/auth/login',
        {
            method: 'POST',
            body: JSON.stringify(request),
        },
    )

    await ensureSuccessfulResponse(response, 'Login')

    const payload = await response.json()
    const data = payload.data ?? payload
    const accessToken = data.accessToken ?? data.access_token
    const refreshToken = data.refreshToken ?? data.refresh_token
    const tokenType = data.tokenType ?? data.token_type ?? 'Bearer'

    if (!accessToken || !refreshToken) {
        throw new Error(
            'Login response does not contain accessToken and refreshToken'
        )
    }

    return {
        accessToken,
        refreshToken,
        tokenType,
        expiresIn: data.expiresIn ?? data.expires_in ?? 0,
    }
}

export async function register(request: RegisterRequest): Promise<void> {
    const response = await apiClient('/auth/register', {
        method: 'POST',
        body: JSON.stringify(request),
    })

    await ensureSuccessfulResponse(response, 'Registration')
}

export async function logout(
    request: LogoutRequest,
): Promise<void> {
    
    const response = await apiClient(
        '/auth/logout',
        {
            method: 'POST',

            body: JSON.stringify(
                request
            ),
        },
    )

    await ensureSuccessfulResponse(response, 'Logout')
}