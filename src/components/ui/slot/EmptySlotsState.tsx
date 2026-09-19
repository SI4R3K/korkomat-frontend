function EmptySlotsState() {
    return (
        <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-white px-6 py-12 text-center">
            <h2 className="m-0 text-lg font-bold text-[var(--color-text-primary)]">No lessons match these filters</h2>
            <p className="mb-0 mt-2 text-sm text-[var(--color-text-secondary)]">Try another subject, date, or search term.</p>
        </div>
    )
}

export default EmptySlotsState
