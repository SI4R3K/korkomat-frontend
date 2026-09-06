import type { ReactNode } from "react"
import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

type PublicRouteProps = {
    children: ReactNode
}

function PublicRoute({
    children,
}: PublicRouteProps) {

    const {
        isAuthenticated,
    } = useAuth()

    if (isAuthenticated) {
        return (
            <Navigate
                to="/select-profile"
                replace
            />
        )
    }

    return children
}

export default PublicRoute
