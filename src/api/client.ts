const API_BASE_URL = 'http://localhost:8080'

export async function apiClient(
    endpoint: string,
    options?: RequestInit,
) {

    const accessToken = 
        localStorage.getItem('accessToken')
    const tokenType =
        localStorage.getItem('tokenType') || 'Bearer'

    const headers = new Headers(options?.headers)

    if (options?.body) {
        headers.set('Content-Type', 'application/json')
    }

    const isPublicAuthRequest = endpoint === '/auth/login'

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
    
    return response
}
