import { useState, type SubmitEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import Button from '../../components/ui/button/Button'
import Input from '../../components/ui/input/Input'
import { resetPassword } from '../../api/authApi'
import { ApiError } from '../../api/ApiError'

function RestPasswordPage() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [searchParams] = useSearchParams()

    const token = searchParams.get('token')
    if (!token) {
        setError('No token provided!')
    }


    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError('')

        if (password !== confirmPassword) {
            setError('Passwords do not match.')
            return
        }

        try {
            await resetPassword({
                token,
                password
            })
            setError('Password has been changed. You can now login')
        } catch(error) {
            if (error instanceof ApiError) {
                setError(error.message)
            }
        } finally {
            setPassword('')
            setConfirmPassword('')
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-6 py-12">
            <section className="w-full max-w-[440px] rounded-2xl border border-[var(--color-border)] bg-white p-8 text-center shadow-[0_12px_28px_rgb(25_43_58/8%)] sm:p-12">
                <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-[var(--color-primary)] text-2xl font-bold text-white" aria-hidden="true">K</span>
                <span className="mt-6 block text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-primary)]">Account recovery</span>
                <h1 className="mb-3 mt-3 text-3xl font-bold text-[var(--color-text-primary)]">Set a new password</h1>
                <form onSubmit={handleSubmit}>
                    <Input id="password" label="New password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your new password" />
                    <Input id="confirmPassword" label="Confirm password" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Repeat your new password" />
                    {error && <p className="mb-3 mt-0 text-sm text-[var(--color-danger)]" role="alert">{error}</p>}
            
                    <Button variant="primary" type="submit">Set new password</Button>
                </form>
                <Link className="mt-8 inline-block font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] hover:underline" to="/auth/login">Back to sign in</Link>
            </section>
        </main>
    )
}

export default RestPasswordPage