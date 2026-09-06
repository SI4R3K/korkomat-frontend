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

export type ProfileRequest = {
    [key: string]: string,
}