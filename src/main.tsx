import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.tsx'

import { AuthProvider } from './context/AuthContext.tsx'
import { UserDetailsProvider } from './context/UserContext.tsx'

import './styles/variables.css'
import './styles/global.css'

createRoot(
    document.getElementById('root')!
).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <UserDetailsProvider>
                    <App />
                </UserDetailsProvider>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>,
)