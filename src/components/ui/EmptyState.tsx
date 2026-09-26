interface EmptyStateProps {
    title: string
    subtitle: string
}

function EmptyState({ title, subtitle }: EmptyStateProps) {
    return (
        <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-white px-6 py-12 text-center">
            <h2 className="m-0 text-lg font-bold text-[var(--color-text-primary)]">{title}</h2>
            <p className="mb-0 mt-2 text-sm text-[var(--color-text-secondary)]">{subtitle}</p>
        </div>
    )
}

export default EmptyState