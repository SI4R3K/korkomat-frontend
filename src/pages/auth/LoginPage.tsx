import LoginForm from '../../components/auth/LoginForm'
import './LoginPage.css'
import { Link } from 'react-router-dom'

function LoginPage() {
    return (
        <main className="login-page">
            <section className="login-page__panel login-page__panel--form">
                <div className="login-page__form-content">
                    <span className="login-page__eyebrow">Welcome back</span>
                    <h1>Sign in to Korkomat</h1>
                    <p className="login-page__intro">
                        Choose the profile you want to use and continue learning or teaching.
                    </p>
                    <LoginForm />
                    <div className="login-page__links">
                        <p>
                            Don&apos;t have an account? <Link to="/register">Create one</Link>
                        </p>
                        <Link to="/forgot-password">Forgot password?</Link>
                    </div>
                </div>
            </section>
            <section className="login-page__panel login-page__panel--welcome">
                <div className="login-page__welcome-content">
                    <span className="login-page__mark" aria-hidden="true">K</span>
                    <span className="login-page__eyebrow">Your learning space</span>
                    <h2>Learn more. Teach better.</h2>
                    <p>
                        Connect with the right people, organize your lessons, and make every session count.
                    </p>
                </div>
            </section>
        </main>
    )
}

export default LoginPage