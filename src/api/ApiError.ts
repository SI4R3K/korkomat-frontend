import type { ErrorStatus } from "../types/api";

export class ApiError extends Error {
    public errorStatus: ErrorStatus | null;

    constructor(
        message: string,
        errorStatus: ErrorStatus | null,
    ) {
        super(message)
        this.name = 'ApiError'
        this.errorStatus = errorStatus
    }
}

export function getApiErrorMessage(
    error: unknown,
    fallbackMessage: string,
): string {
    if (error instanceof ApiError) {
        switch (error.errorStatus) {
            case 'USER_NOT_ACTIVE':
                return 'Potwierdź najpierw swój adres email'
            case 'AUTHENTICATION_FAILED':
                return 'Nieprawidłowy email lub hasło'
            case 'USER_NOT_FOUND':
                return 'Nieprawidłowy email lub hasło'
            default:
                return error.message || fallbackMessage
        }
    }

    return error instanceof Error ? error.message : fallbackMessage
}

