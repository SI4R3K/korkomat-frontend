import './Button.css'

type ButtonVariant = 
    | 'primary'
    | 'secondary'
    | 'danger'

type ButtonProps = {
    children: React.ReactNode
    variant?: ButtonVariant
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
    onClick?: () => void
}

function Button({
    children,
    variant='primary',
    disabled=false,
    type='button',
    onClick,
}: ButtonProps) {
    return (
        <button
            className={`button button--${variant}`}
            type={type}
            disabled={disabled}
            onClick={onClick}>

            {children}
        </button>
    )
}

export default Button