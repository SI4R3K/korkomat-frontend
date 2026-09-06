import { apiClient } from "./client";
import type { UserDetailsResponse } from "../types/user";

export async function getUserDetails( 
): Promise<UserDetailsResponse> {

    const response = await apiClient(
        '/user/get/me',
        {
            method: 'GET',
            body: null
        },
    )

    if (!response.ok) {
        const message = await response.text()
        throw new Error(
            message || `Getting user details failed (${response.status})`
        )
    }

    const payload = await response.json()
    return payload.data ?? payload
}