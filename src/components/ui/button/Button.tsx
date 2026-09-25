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
    const variantClasses = {
        primary: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]',
        secondary: 'bg-[var(--color-secondary)] text-white hover:bg-[#3f4e66]',
        danger: 'bg-[var(--color-danger)] text-white hover:bg-[#a33732]',
    }

    return (
        <button
            className={`mt-1 w-full rounded-xl px-5 py-3 text-base font-bold shadow-[0_8px_18px_rgb(25_43_58/10%)] transition duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 ${variantClasses[variant]}`}
            type={type}
            disabled={disabled}
            onClick={onClick}>

            {children}
        </button>
    )
}

export default Button