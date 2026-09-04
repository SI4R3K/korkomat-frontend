import { apiClient } from "./client";
import type { LoginRequest, LoginResponse } from '../types/login';

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

    if (!response.ok) {
        throw new Error('Login failed')
    }

    return response.json()
}