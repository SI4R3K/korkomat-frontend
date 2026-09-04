const API_BASE_URL = 'http://localhost:8080'

export async function apiClient(
    endpoint: string,
    options?: RequestInit,
) {
    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
            ...options,
        },
    )
    return response
}
