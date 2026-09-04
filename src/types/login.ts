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