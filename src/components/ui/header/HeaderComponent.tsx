import type { ReactNode } from 'react'

type HeaderComponentProps = {
    profileType?: 'Student' | 'Tutor',
    title: string,
    subtitle: string,
    subsubtitle: string,
    className?: string,
    icon?: ReactNode,
}

function HeaderComponent({
    profileType,
    title,
    subtitle,
    subsubtitle,
    className,
    icon,
}: HeaderComponentProps) {
    const badgeText = profileType ? `${profileType} ${title}` : title

    return (
        <header className={className ?? 'mb-6'}>
            <div className={icon ? 'flex flex-col items-start justify-between gap-6 md:flex-row md:items-start' : ''}>
                <div>
                    <span className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-primary)]">{badgeText}</span>
                    <h1 className="mb-2 mt-2 text-3xl font-bold text-[var(--color-text-primary)] sm:text-[42px]">{subtitle}</h1>
                    <p className="m-0 max-w-xl leading-relaxed text-[var(--color-text-secondary)]">{subsubtitle}</p>
                </div>
                {icon}
            </div>
        </header>
    )
}

export default HeaderComponent