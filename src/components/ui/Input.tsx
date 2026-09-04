import './Input.css'

type InputProps = {
    id: string
    label?: string
    type?: string
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
}

function Input({
    id,
    label,
    type = 'text',
    value,
    onChange,
    placeholder
}: InputProps) {
    return (
         <div className="input">
            {label && (
                <label
                    className="input__label"
                    htmlFor={id}
                >
                    {label}
                </label>
            )}

            <input
                className="input__field"
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    )
}

export default Input