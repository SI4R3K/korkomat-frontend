import { useState, type SubmitEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { register } from '../../api/authApi'
import { createProfile, type ProfileType } from '../../api/profileApi'
import { useUserDetails } from '../../context/UserContext'
import './RegisterPage.css'

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
        <main className="register-page">
            <section className="register-page__panel register-page__panel--form">
                <div className="register-page__form-content">
                    <span className="register-page__eyebrow">{isProfile ? 'Profile setup' : 'Korkomat account'}</span>
                    <h1>{title}</h1>
                    <p className="register-page__intro">{intro}</p>
                    <form className="register-form" onSubmit={handleSubmit}>
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
                        {error && <p className="register-form__error" role="alert">{error}</p>}
                        <Button variant="primary" type="submit" disabled={isLoading}>
                            {isLoading ? 'Saving...' : isProfile ? 'Create profile' : 'Create account'}
                        </Button>
                    </form>
                    <div className="register-page__links">
                        {isProfile ? <Link to="/select-profile">Back to profile selection</Link> : <p>Already have an account? <Link to="/login">Sign in</Link></p>}
                    </div>
                </div>
            </section>
            <section className="register-page__panel register-page__panel--welcome">
                <div className="register-page__welcome-content">
                    <span className="register-page__mark" aria-hidden="true">K</span>
                    <span className="register-page__eyebrow">Learn more. Teach better.</span>
                    <h2>A profile for the way you learn.</h2>
                    <p>Start with one account, then shape Korkomat around the way you want to learn or teach.</p>
                </div>
            </section>
        </main>
    )
}

export default RegisterPage