import { Link } from 'react-router-dom'

function ForgotPasswordPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-6 py-12">
            <section className="w-full max-w-[440px] rounded-2xl border border-[var(--color-border)] bg-white p-8 text-center shadow-[0_12px_28px_rgb(25_43_58/8%)] sm:p-12">
                <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-[var(--color-primary)] text-2xl font-bold text-white" aria-hidden="true">K</span>
                <span className="mt-6 block text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-primary)]">Account recovery</span>
                <h1 className="mb-3 mt-3 text-3xl font-bold text-[var(--color-text-primary)]">Forgot your password?</h1>
                <p className="m-0 leading-relaxed text-[var(--color-text-secondary)]">Password recovery will be available soon. Return to sign in for now.</p>
                <Link className="mt-8 inline-block font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] hover:underline" to="/login">Back to sign in</Link>
            </section>
        </main>
        
    )
}

export default ForgotPasswordPage