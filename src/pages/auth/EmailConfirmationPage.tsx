import { EnvelopeIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'

type RegistrationLocationState = {
    email?: string
}

function EmailConfirmationPage() {
    const location = useLocation()
    const state = location.state as RegistrationLocationState | null
    const email = state?.email

    return (
        <main className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-6 py-12">
            <section className="w-full max-w-[480px] rounded-2xl border border-[var(--color-border)] bg-white p-8 shadow-[0_12px_28px_rgb(25_43_58/8%)] sm:p-12">
                <span className="grid size-14 place-items-center rounded-2xl bg-[var(--color-primary)] text-white" aria-hidden="true">
                    <EnvelopeIcon className="size-7" />
                </span>
                <span className="mt-7 block text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-primary)]">Account created</span>
                <h1 className="mb-3 mt-3 text-3xl font-bold leading-tight text-[var(--color-text-primary)]">Check your email</h1>
                <p className="m-0 leading-relaxed text-[var(--color-text-secondary)]">
                    We&apos;ve sent you an email with a link to confirm your account.
                </p>
                {email && (
                    <p className="mt-4 break-all font-bold text-[var(--color-text-primary)]">{email}</p>
                )}
                <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    Open the link in that message to finish setting up your account. If you don&apos;t see it, check your spam folder.
                </p>
                <Link className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-[var(--color-primary)] px-5 py-3 font-bold text-white shadow-[0_8px_18px_rgb(25_43_58/10%)] transition hover:-translate-y-0.5 hover:bg-[var(--color-primary-hover)]" to="/auth/login">
                    Go to sign in
                </Link>
            </section>
        </main>
    )
}

export default EmailConfirmationPage