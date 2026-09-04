import { apiClient } from "./client";
import type { 
    UserDetailsResponse, 
    StudentDetailsResponse, 
    TutorDetailsResponse 
} from "../types/user";

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
        throw new Error(
            'Getting user details failed'
        )
    }

    return response.json()
}