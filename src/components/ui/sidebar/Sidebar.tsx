import {
    ArrowLeftIcon,
    ArrowRightIcon,
    ArrowLeftStartOnRectangleIcon,
    BookOpenIcon,
    CalendarDaysIcon,
    ChatBubbleLeftRightIcon,
    Cog6ToothIcon,
    HomeIcon,
    MagnifyingGlassIcon,
    UserCircleIcon,
    UsersIcon,
    BeakerIcon,
} from '@heroicons/react/24/outline'
import { useUserDetails } from '../../../context/UserContext'
import SidebarItem, { type SidebarItemProps } from './SidebarItem'

type SidebarProps = {
    profileType: 'Student' | 'Tutor'
    expanded: boolean
    setExpanded: (expanded: boolean) => void
    onLogout: () => void
    isLoggingOut: boolean
}

function Sidebar({ profileType, expanded, setExpanded, onLogout, isLoggingOut }: SidebarProps) {
    const { fullName, email } = useUserDetails()
    const role = profileType.toLowerCase()
    const displayName = fullName || 'Korkomat member'
    const initials = displayName
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()

    const navItems: SidebarItemProps[] = profileType === 'Student'
        ? [
            { icon: <HomeIcon />, text: 'Overview', to: `/${role}/dashboard`, expanded },
            { icon: <MagnifyingGlassIcon />, text: 'Schedule lessons', to: `/${role}/available-slots`, expanded, active: false },
            { icon: <BookOpenIcon />, text: 'My lessons', to: `/${role}/dashboard`, expanded, active: false },
            { icon: <ChatBubbleLeftRightIcon />, text: 'Messages', to: `/${role}/dashboard`, expanded, active: false },
            { icon: <UserCircleIcon />, text: 'My profile', to: '/select-profile', expanded, active: false },
        ]
        : [
            { icon: <HomeIcon />, text: 'Overview', to: `/${role}/dashboard`, expanded },
            { icon: <UsersIcon />, text: 'My students', to: `/${role}/dashboard`, expanded, active: false },
            { icon: <CalendarDaysIcon />, text: 'Availability', to: `/${role}/availability`, expanded, active: false },
            { icon: <BeakerIcon />, text: 'My subjects', to : `/${role}/my-subjects`, expanded, active: false},
            { icon: <ChatBubbleLeftRightIcon />, text: 'Messages', to: `/${role}/dashboard`, expanded, active: false },
            { icon: <UserCircleIcon />, text: 'My profile', to: '/select-profile', expanded, active: false },
        ]

    return (
        <>
            {expanded && (
                <button
                    aria-label="Close navigation"
                    className="fixed inset-0 z-20 bg-[var(--color-text-primary)]/30 sm:hidden"
                    onClick={() => setExpanded(false)}
                />
            )}
            <aside className={`fixed inset-y-0 left-0 z-30 transition-all duration-400 ${expanded ? 'w-[280px]' : 'w-0 sm:w-[84px]'}`}>
                <nav className="flex h-full flex-col border-r border-[var(--color-border)] bg-white px-3 py-5 shadow-[8px_0_24px_rgb(25_43_58/5%)]">
                    <div className="flex items-center justify-between px-2 pb-8">
                        <div className={`flex items-center gap-3 overflow-hidden transition-all ${expanded ? 'w-full' : 'w-0 sm:w-auto'}`}>
                            {expanded ? 
                                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--color-primary)] text-lg font-bold text-white">K</span> :
                                <span></span>
                            }
                            
                            <div className="whitespace-nowrap">
                                <p className="m-0 text-base font-black tracking-tight text-[var(--color-text-primary)]">Korkomat</p>
                                <p className="m-0 text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-text-secondary)]">{profileType} space</p>
                            </div>
                        </div>
                        <button
                            aria-label={expanded ? 'Collapse navigation' : 'Expand navigation'}
                            onClick={() => setExpanded(!expanded)}
                            className="grid size-9 shrink-0 place-items-center rounded-lg text-[var(--color-text-secondary)] transition hover:bg-[var(--color-background)] hover:text-[var(--color-text-primary)]"
                        >
                            {expanded ? <ArrowLeftIcon className="size-5" /> : <ArrowRightIcon className="size-5" />}
                        </button>
                    </div>

                    <div className={`mb-3 overflow-hidden px-2 text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-text-secondary)] transition-all ${expanded ? 'h-5' : 'h-0'}`}>
                        Workspace
                    </div>
                    <ul className="flex flex-1 flex-col gap-1 px-1">
                        {navItems.map((item) => <SidebarItem key={item.text} {...item} />)}
                        <li className="mt-auto border-t border-[var(--color-border)] pt-3">
                            <SidebarItem icon={<Cog6ToothIcon />} text="Settings" to={`/${role}/dashboard`} expanded={expanded} />
                        </li>
                    </ul>

                    <div className="mt-5 border-t border-[var(--color-border)] px-1 pt-4">
                        <div className={`flex items-center gap-2 overflow-hidden rounded-xl px-2 py-2 ${expanded ? '' : 'pt-1 sm:flex-col sm:justify-center sm:gap-0'}`}>
                            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[var(--color-primary-soft)] text-sm font-bold text-[var(--color-primary)]">{initials}</span>
                            <div className={`min-w-0 flex-1 overflow-hidden transition-all ${expanded ? 'w-auto' : 'w-0'}`}>
                                <p className="m-0 truncate text-sm font-bold text-[var(--color-text-primary)]">{displayName}</p>
                                <p className="m-0 truncate text-xs text-[var(--color-text-secondary)]">{email || 'No email available'}</p>
                            </div>
                            <button
                                type="button"
                                aria-label={isLoggingOut ? 'Signing out' : 'Sign out'}
                                title={isLoggingOut ? 'Signing out' : 'Sign out'}
                                onClick={onLogout}
                                disabled={isLoggingOut}
                                className="grid size-9 shrink-0 place-items-center rounded-lg text-[var(--color-danger)] transition hover:bg-red-50 disabled:cursor-wait disabled:opacity-50"
                            >
                                <ArrowLeftStartOnRectangleIcon className="size-7" />
                            </button>
                        </div>
                    </div>
                </nav>
            </aside>
        </>
    )
}

export default function MakeSidebar({ profileType, expanded, setExpanded, onLogout, isLoggingOut }: SidebarProps) {
    return <Sidebar profileType={profileType} expanded={expanded} setExpanded={setExpanded} onLogout={onLogout} isLoggingOut={isLoggingOut} />
}
