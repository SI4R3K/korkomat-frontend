import { Link } from 'react-router-dom'
import Button from '../../components/ui/button/Button'
import Input from '../../components/ui/input/Input'
import { useState, type SubmitEvent } from 'react'
import { getApiErrorMessage } from '../../api/ApiError'
import { forgotPassword } from '../../api/authApi'




function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            await forgotPassword({
                email
            })
        } catch (submissionError) {
            setError(getApiErrorMessage(submissionError, 'Smoething went wrong, please try again.'))
        } finally {
            if (email.length === 0) {
                setError('Please provide an e-mail adress!')
            } else {
                setError('If an account with this email exists, a reset link has been sent.')
            }
            setIsLoading(false)
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-6 py-12">
            <section className="w-full max-w-[440px] rounded-2xl border border-[var(--color-border)] bg-white p-8 text-center shadow-[0_12px_28px_rgb(25_43_58/8%)] sm:p-12">
                <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-[var(--color-primary)] text-2xl font-bold text-white" aria-hidden="true">K</span>
                <span className="mt-6 block text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-primary)]">Account recovery</span>
                <h1 className="mb-3 mt-3 text-3xl font-bold text-[var(--color-text-primary)]">Forgot your password?</h1>
                {/* <p className="m-0 leading-relaxed text-[var(--color-text-secondary)]">Enter e-mail adress assigned to your account</p> */}
                <form onSubmit={handleSubmit}>
                    {error && <p className="mb-3 mt-0 text-sm text-[var(--color-danger)]" role="alert">{error}</p>}
                    <Input id="e-mail" value={email ?? ''} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your e-mail adress" />
                    <Button 
                        variant="primary" 
                        type="submit" 
                        disabled={isLoading}
                    >
                        {isLoading ? 'Sending e-mail' : 'Reset password'}
                    </Button>
                </form>    
                <Link className="mt-8 inline-block font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] hover:underline" to="/auth/login">Back to sign in</Link>
            </section>
        </main>
        
    )
}

export default ForgotPasswordPage