import { useState } from 'react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import Button from '../../components/ui/button/Button'
import { verifyEmail } from '../../api/authApi'
import { ApiError } from '../../api/ApiError'

function ConfirmEmailPage() {
    const [searchParams] = useSearchParams()
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const token = searchParams.get('token')

    if (!token) {
        setError('No token provided!')
    }

    const handleConfirm = async () => {
        setError('')
        setIsLoading(true)
        try {
            await verifyEmail(token)
            navigate('/auth/login')
        } catch(error) {
            if (error instanceof ApiError) {
                switch(error.errorStatus) {
                    case 'VERIFICATION_TOKEN_EXPIRED':
                        setError('Link has already expired, click below to resend the link')
                        break
                
                    case 'VERIFICATION_TOKEN_ALREADY_USED':
                        setError('The account is already active')
                        break

                    default:
                        setError(error.message)
                        break
                }
            }
        } finally {
            setIsLoading(false)
        }
    }

    // TODO add option for resending the confirmation e-mail
    return (
        <main className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-6 py-12">
            <section className="w-full max-w-[440px] rounded-2xl border border-[var(--color-border)] bg-white p-8 text-center shadow-[0_12px_28px_rgb(25_43_58/8%)] sm:p-12">
                <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-[var(--color-primary)] text-white" aria-hidden="true">
                    <CheckCircleIcon className="size-7" />
                </span>
                <span className="mt-6 block text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-primary)]">Account verification</span>
                <h1 className="mb-5 mt-3 text-3xl font-bold text-[var(--color-text-primary)]">Confirm your email</h1>
                {error && <p className="mb-5 mt-0 text-sm text-[var(--color-danger)]" role="alert">{error}</p>}
                <Button variant="primary" type="button" onClick={handleConfirm}>{isLoading ? "Loading..." : "Click here to acctivate your account"}</Button>
                <Link className="mt-8 inline-block font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] hover:underline" to="/auth/login">Back to sign in</Link>
            </section>
        </main>
    )
}

export default ConfirmEmailPage