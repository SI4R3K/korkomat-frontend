import { NavLink } from 'react-router-dom'

export interface SidebarItemProps {
    icon: React.ReactNode,
    text: string,
    expanded: boolean,
    to: string,
    active?: boolean,
}

export default function SidebarItem({
    icon,
    text,
    expanded=false,
    to,
    active,
}: SidebarItemProps) {
    return (
        <li>
            <NavLink
                to={to}
                end={to.endsWith('/dashboard')}
                title={expanded ? undefined : text}
                className={({ isActive }) => `group flex items-center rounded-xl px-3 py-3 text-sm font-bold transition ${
                    active ?? isActive
                        ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]'
                        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-background)] hover:text-[var(--color-text-primary)]'
                }`}
            >
                <span className="grid size-5 shrink-0 place-items-center">{icon}</span>
                <span className={`overflow-hidden whitespace-nowrap transition-all ${expanded ? 'ml-3 w-44' : 'ml-0 w-0'}`}>
                    {text}
                </span>
            </NavLink>
        </li>
    )
}