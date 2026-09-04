import './Button.css'

type ButtonVariant = 
    | 'primary'
    | 'secondary'
    | 'danger'

type ButtonProps = {
    children: React.ReactNode
    variant?: ButtonVariant
    disabled: boolean
    type?: 'button' | 'submit' | 'reset'
}

function Button({
    children,
    variant='primary',
    disabled=false,
    type='button'
}: ButtonProps) {
    return (
        <button
            className={`button button--${variant}`}
            type={type}
            disabled={disabled}>

            {children}
        </button>
    )
}

export default Button