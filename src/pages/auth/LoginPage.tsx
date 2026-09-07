import LoginForm from '../../components/auth/LoginForm'
import { Link } from 'react-router-dom'

function LoginPage() {
    return (
        <main className="grid min-h-screen grid-cols-1 bg-[var(--color-background)] lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
            <section className="flex items-center justify-center bg-white px-6 py-12 sm:px-10 lg:px-16">
                <div className="w-full max-w-[420px]">
                    <span className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-primary)]">Welcome back</span>
                    <h1 className="mb-3 mt-3 text-4xl font-bold leading-tight text-[var(--color-text-primary)] sm:text-[46px]">Sign in to Korkomat</h1>
                    <p className="mb-8 mt-0 leading-relaxed text-[var(--color-text-secondary)]">
                        Choose the profile you want to use and continue learning or teaching.
                    </p>
                    <LoginForm />
                    <div className="mt-6 flex flex-col items-start justify-between gap-3 text-sm text-[var(--color-text-secondary)] sm:flex-row sm:items-center">
                        <p className="m-0">
                            Don&apos;t have an account? <Link className="font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] hover:underline" to="/register">Create one</Link>
                        </p>
                        <Link className="font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] hover:underline" to="/forgot-password">Forgot password?</Link>
                    </div>
                </div>
            </section>
            <section className="flex min-h-[300px] items-start justify-center bg-[var(--color-surface-contrast)] bg-[linear-gradient(145deg,var(--color-primary-hover),var(--color-surface-contrast)_62%)] px-6 py-12 text-[var(--color-text-on-contrast)] sm:px-10 lg:min-h-0 lg:items-center lg:py-16">
                <div className="w-full max-w-[360px]">
                    <span className="mb-8 grid size-14 place-items-center rounded-2xl border border-[var(--color-border-on-contrast)] text-2xl font-bold" aria-hidden="true">K</span>
                    <span className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-text-on-contrast)] opacity-80">Your learning space</span>
                    <h2 className="mb-3 mt-3 text-4xl font-bold leading-tight sm:text-[44px]">Learn more. Teach better.</h2>
                    <p className="m-0 max-w-[320px] leading-relaxed text-[var(--color-text-on-contrast)] opacity-80">
                        Connect with the right people, organize your lessons, and make every session count.
                    </p>
                </div>
            </section>
        </main>
    )
}

export default LoginPage