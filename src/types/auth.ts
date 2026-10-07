export type LoginRequest = {
    email: string,
    password: string
}

export type LoginResponse = {
    accessToken: string,
    expiresIn: number,
    tokenType: string,
    refreshToken: string,
}

export type LogoutRequest = {
    refreshToken: string,
}

export type RegisterRequest = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

export type RegisterProfileResponse = {
    message: string
}

export type ProfileRequest = {
    [key: string]: string,
}

export type ForgotPasswordRequest = {
    email: string
}

export type RessetPasswordRequest = {
    token: string,
    password: string
}