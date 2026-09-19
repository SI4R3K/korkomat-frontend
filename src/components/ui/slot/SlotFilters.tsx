import {
    FunnelIcon,
    MagnifyingGlassIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'

type SlotFiltersProps = {
    searchQuery: string
    tutorFilter: string
    dateFilter: string
    formatFilter: string
    tutorOptions: string[]
    dateOptions: { value: string, label: string }[]
    onSearchChange: (value: string) => void
    onTutorChange: (value: string) => void
    onDateChange: (value: string) => void
    onFormatChange: (value: string) => void
    onClear: () => void
}

function SlotFilters({
    searchQuery,
    tutorFilter,
    dateFilter,
    formatFilter,
    tutorOptions,
    dateOptions,
    onSearchChange,
    onTutorChange,
    onDateChange,
    onFormatChange,
    onClear,
}: SlotFiltersProps) {
    const hasActiveFilters = searchQuery
        || tutorFilter !== 'All tutors'
        || dateFilter !== 'Any date'
        || formatFilter !== 'Any format'

    return (
        <section className="rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-[0_8px_24px_rgb(25_43_58/8%)] sm:p-6" aria-label="Search and filter lessons">
            <div className="relative">
                <label className="sr-only" htmlFor="slot-search">Search lessons</label>
                <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[var(--color-text-secondary)]" />
                <input
                    id="slot-search"
                    type="search"
                    value={searchQuery}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder="Search by tutor, subject, or location"
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] py-3 pl-12 pr-4 text-base text-[var(--color-text-primary)] outline-none transition placeholder:text-[var(--color-text-secondary)]/60 focus:border-[var(--color-border-focus)] focus:ring-4 focus:ring-[var(--color-primary-soft)]"
                />
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm font-bold text-[var(--color-text-primary)]">
                <FunnelIcon className="size-4 text-[var(--color-primary)]" />
                <span>Filter results</span>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
                <label className="flex flex-col gap-2 text-sm font-bold text-[var(--color-text-primary)]" htmlFor="tutor-filter">
                    Tutor
                    <select id="tutor-filter" value={tutorFilter} onChange={(event) => onTutorChange(event.target.value)} className="rounded-xl border border-[var(--color-border)] bg-white px-3 py-3 font-normal outline-none focus:border-[var(--color-border-focus)] focus:ring-4 focus:ring-[var(--color-primary-soft)]">
                        <option>All tutors</option>
                        {tutorOptions.map((tutor) => (
                            <option key={tutor}>{tutor}</option>
                        ))}
                    </select>
                </label>
                <label className="flex flex-col gap-2 text-sm font-bold text-[var(--color-text-primary)]" htmlFor="date-filter">
                    Date
                    <select id="date-filter" value={dateFilter} onChange={(event) => onDateChange(event.target.value)} className="rounded-xl border border-[var(--color-border)] bg-white px-3 py-3 font-normal outline-none focus:border-[var(--color-border-focus)] focus:ring-4 focus:ring-[var(--color-primary-soft)]">
                        <option>Any date</option>
                        {dateOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </label>
                <label className="flex flex-col gap-2 text-sm font-bold text-[var(--color-text-primary)]" htmlFor="format-filter">
                    Lesson format
                    <select id="format-filter" value={formatFilter} onChange={(event) => onFormatChange(event.target.value)} className="rounded-xl border border-[var(--color-border)] bg-white px-3 py-3 font-normal outline-none focus:border-[var(--color-border-focus)] focus:ring-4 focus:ring-[var(--color-primary-soft)]">
                        <option>Any format</option>
                        <option>Online</option>
                        <option>In person</option>
                    </select>
                </label>
            </div>
            {hasActiveFilters && (
                <button type="button" onClick={onClear} className="mt-4 inline-flex items-center gap-2 border-0 bg-transparent p-0 text-sm font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]">
                    <XMarkIcon className="size-4" />
                    Clear filters
                </button>
            )}
        </section>
    )
}

export default SlotFilters
