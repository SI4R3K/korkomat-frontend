import type { ApiResponse } from "../types/api"
import { ApiError } from "./ApiError"

const API_BASE_URL = 'http://localhost:8080'

export async function apiClient<T>(
    endpoint: string,
    options?: RequestInit,
): Promise<T> {

    const accessToken = 
        localStorage.getItem('accessToken')

    const tokenType =
        localStorage.getItem('tokenType') || 'Bearer'

    const headers = new Headers(options?.headers)

    if (options?.body) {
        headers.set('Content-Type', 'application/json')
    }

    const isPublicAuthRequest = 
        endpoint === '/auth/login'

    if (accessToken && !isPublicAuthRequest) {
        headers.set(
            'Authorization',
            `${tokenType} ${accessToken}`,
        )
    }

    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
            ... options,
            headers,
        },
    )

    const body: ApiResponse<T> = await response.json()
    
    if (!body.ok) {
        throw new ApiError(
            body.message,
            body.errorStatus,
        )
    }

    return body.data as T
}


