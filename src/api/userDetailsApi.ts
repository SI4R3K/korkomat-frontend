import { apiClient } from "./client";
import type { UserDetailsResponse } from "../types/user";

export async function getUserDetails( 
): Promise<UserDetailsResponse> {

    return apiClient<UserDetailsResponse>(
        '/user/get/me',
        {
            method: 'GET',
        },
    )
}