import { useState, type SubmitEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import Button from '../../components/ui/button/Button'
import Input from '../../components/ui/input/Input'
import { register } from '../../api/authApi'
import { createProfile, type ProfileType } from '../../api/profileApi'
import { useUserDetails } from '../../context/UserContext'

type RegisterMode = 'account' | ProfileType

const profileFields = {
    student: [
        { id: 'educationLevel', label: 'Education level', placeholder: 'e.g. High school, university' },
        { id: 'subjects', label: 'Subjects you want to learn', placeholder: 'e.g. Mathematics, English' },
        { id: 'learningGoals', label: 'Learning goals', placeholder: 'What would you like to achieve?' },
    ],
    tutor: [
        { id: 'bio', label: 'Enter a short bio', placeholder: 'e.g your experience, education, passions' },
        { id: 'hourlyRate', label: 'Enter your avarage hourly rate', placeholder: '' },
    ],
} as const

function RegisterPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const { getDetails } = useUserDetails()
    const pathMode = location.pathname.split('/').at(-1)
    const mode: RegisterMode = pathMode === 'student' || pathMode === 'tutor'
        ? pathMode
        : 'account'
    const [values, setValues] = useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const updateValue = (id: string, value: string) => {
        setValues((current) => ({ ...current, [id]: value }))
    }

    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError('')

        if (mode === 'account' && values.password !== values.confirmPassword) {
            setError('Passwords do not match.')
            return
        }

        setIsLoading(true)
        try {
            if (mode === 'account') {
                await register({
                    firstName: values.firstName ?? '',
                    lastName: values.lastName ?? '',
                    email: values.email ?? '',
                    password: values.password ?? '',
                })
                navigate('/login', { state: { registrationComplete: true } })
            } else {
                await createProfile(mode, values)
                await getDetails()
                navigate(`/${mode}/dashboard`, { replace: true })
            }
        } catch (submissionError) {
            setError(submissionError instanceof Error
                ? submissionError.message
                : 'Something went wrong. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const isProfile = mode !== 'account'
    const title = mode === 'account' ? 'Create your account' : `Set up your ${mode} profile`
    const intro = mode === 'account'
        ? 'Join Korkomat and make your next lesson count.'
        : 'Add a few details so your Korkomat experience feels like yours.'

    return (
        <main className="grid min-h-screen grid-cols-1 bg-[var(--color-background)] lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
            <section className="flex items-center justify-center bg-white px-6 py-12 sm:px-10 lg:px-16">
                <div className="w-full max-w-[440px]">
                    <span className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-primary)]">{isProfile ? 'Profile setup' : 'Korkomat account'}</span>
                    <h1 className="mb-3 mt-3 text-4xl font-bold leading-tight text-[var(--color-text-primary)] sm:text-[46px]">{title}</h1>
                    <p className="mb-7 mt-0 leading-relaxed text-[var(--color-text-secondary)]">{intro}</p>
                    <form onSubmit={handleSubmit}>
                        {mode === 'account' ? (
                            <>
                                <Input id="firstName" label="First name" value={values.firstName ?? ''} onChange={(event) => updateValue('firstName', event.target.value)} placeholder="Enter your first name" />
                                <Input id="lastName" label="Last name" value={values.lastName ?? ''} onChange={(event) => updateValue('lastName', event.target.value)} placeholder="Enter your last name" />
                                <Input id="email" label="Email" type="email" value={values.email ?? ''} onChange={(event) => updateValue('email', event.target.value)} placeholder="Enter your email" />
                                <Input id="password" label="Password" type="password" value={values.password ?? ''} onChange={(event) => updateValue('password', event.target.value)} placeholder="Create a password" />
                                <Input id="confirmPassword" label="Confirm password" type="password" value={values.confirmPassword ?? ''} onChange={(event) => updateValue('confirmPassword', event.target.value)} placeholder="Repeat your password" />
                            </>
                        ) : profileFields[mode].map((field) => (
                            <Input key={field.id} id={field.id} label={field.label} value={values[field.id] ?? ''} onChange={(event) => updateValue(field.id, event.target.value)} placeholder={field.placeholder} />
                        ))}
                        {error && <p className="mb-3 mt-0 text-sm text-[var(--color-danger)]" role="alert">{error}</p>}
                        <Button variant="primary" type="submit" disabled={isLoading}>
                            {isLoading ? 'Saving...' : isProfile ? 'Create profile' : 'Create account'}
                        </Button>
                    </form>
                    <div className="mt-6 text-sm text-[var(--color-text-secondary)]">
                        {isProfile ? <Link className="font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] hover:underline" to="/select-profile">Back to profile selection</Link> : <p className="m-0">Already have an account? <Link className="font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] hover:underline" to="/login">Sign in</Link></p>}
                    </div>
                </div>
            </section>
            <section className="flex min-h-[300px] items-start justify-center bg-[linear-gradient(145deg,var(--color-primary-hover),var(--color-surface-contrast)_62%)] px-6 py-12 text-[var(--color-text-on-contrast)] sm:px-10 lg:min-h-0 lg:items-center lg:py-16">
                <div className="w-full max-w-[360px]">
                    <span className="mb-8 grid size-14 place-items-center rounded-2xl border border-[var(--color-border-on-contrast)] text-2xl font-bold" aria-hidden="true">K</span>
                    <span className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-text-on-contrast)] opacity-80">Learn more. Teach better.</span>
                    <h2 className="mb-3 mt-3 text-4xl font-bold leading-tight sm:text-[44px]">A profile for the way you learn.</h2>
                    <p className="m-0 max-w-[320px] leading-relaxed text-[var(--color-text-on-contrast)] opacity-80">Start with one account, then shape Korkomat around the way you want to learn or teach.</p>
                </div>
            </section>
        </main>
    )
}

export default RegisterPage