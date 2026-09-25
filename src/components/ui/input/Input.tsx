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
         <div className="mb-4 flex flex-col gap-2">
            {label && (
                <label
                    className="text-sm font-bold text-[var(--color-text-primary)]"
                    htmlFor={id}
                >
                    {label}
                </label>
            )}

            <input
                className="w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 text-base text-[var(--color-text-primary)] outline-none transition placeholder:text-[var(--color-text-secondary)]/60 focus:border-[var(--color-border-focus)] focus:ring-4 focus:ring-[var(--color-primary-soft)]"
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