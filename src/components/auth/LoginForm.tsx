import { 
    useState, 
    type SubmitEvent 
} from 'react'

import { useNavigate } from 'react-router-dom'

import Button from '../ui/Button'
import Input from '../ui/Input'

import { useAuth } from '../../context/AuthContext'

import './LoginForm.css'
import { useUserDetails } from '../../context/UserContext'

function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const {
        login,
    } = useAuth()

    const {
        getDetails,
    } = useUserDetails()

    const navigate = 
        useNavigate()

    const handleSubmit = async (
        event: SubmitEvent<HTMLFormElement>
    ) => {
        event.preventDefault()

        setIsLoading(true)

        try {
            await login({
                email,
                password
            })

            const userDetails = await getDetails()
            
            console.log(userDetails)

            navigate('/select-profile')

        } catch (error) {
            console.error('Login error: ',error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form
            className='login-form' 
            onSubmit={handleSubmit}
        >
            <div className="login-form_fields">

                <Input
                    id="email"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                        setEmail(
                            event.target.value
                        )
                    }
                    placeholder="Enter your email"
                />
                <Input
                    id="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(event) =>
                        setPassword(event.target.value)
                    }
                    placeholder="Enter your password"
                />
            </div>
                <Button 
                    variant="primary"
                    type="submit"
                    disabled={isLoading}
                >
                    Sign in
                </Button>
        </form>
    )
}

export default LoginForm