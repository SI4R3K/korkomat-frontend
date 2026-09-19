import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { studentGetSlots } from '../../api/slotApi'
import { useAuth } from '../../context/AuthContext'
import MakeSidebar from "../../components/ui/sidebar/Sidebar"

import mapApiSlot  from '../../util/ApiSlotMapper'

import type { AvailableSlot } from '../../types/availableSlot'
import EmptySlotsState from '../../components/ui/slot/EmptySlotsState'
import SlotFilters from '../../components/ui/slot/SlotFilters'
import SlotList from '../../components/ui/slot/SlotList'


type AvailableSlotPageProps = {
    profileType?: 'Student' | 'Tutor',
}

function AvailableSlotPage( { profileType }: AvailableSlotPageProps) {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const [sidebarExpanded, setSidebarExpanded] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [tutorFilter, setTutorFilter] = useState('All tutors')
    const [dateFilter, setDateFilter] = useState('Any date')
    const [formatFilter, setFormatFilter] = useState('Any format')
    const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([])
    const [isLoadingSlots, setIsLoadingSlots] = useState(true)
    const [slotsError, setSlotsError] = useState('')

    useEffect(() => {
        const loadSlots = async () => {
            try {
                setSlotsError('')
                const response = await studentGetSlots()
                setAvailableSlots(response.allAvailableSlots.map(mapApiSlot))
            } catch (error) {
                setSlotsError(error instanceof Error ? error.message : 'Could not load available slots.')
            } finally {
                setIsLoadingSlots(false)
            }
        }

        void loadSlots()
    }, [])

    const handleLogout = async () => {
        setIsLoggingOut(true)
        await logout()
        navigate('/login', { replace: true })
    }

    const filteredSlots = availableSlots.filter((slot) => {
        const normalizedQuery = searchQuery.trim().toLowerCase()
        const matchesSearch = !normalizedQuery
            || `${slot.tutor} ${slot.subject} ${slot.location}`.toLowerCase().includes(normalizedQuery)
        const matchesTutor = tutorFilter === 'All tutors' || slot.tutor === tutorFilter
        const matchesDate = dateFilter === 'Any date' || slot.date === dateFilter
        const matchesFormat = formatFilter === 'Any format'
            || slot.format === 'Any'
            || slot.format === formatFilter

        return matchesSearch && matchesTutor && matchesDate && matchesFormat
    })

    const clearFilters = () => {
        setSearchQuery('')
        setTutorFilter('All tutors')
        setDateFilter('Any date')
        setFormatFilter('Any format')
    }

    const dateOptions = availableSlots
        .filter((slot, index, slots) => slots.findIndex((candidate) => candidate.date === slot.date) === index)
        .map((slot) => ({ value: slot.date, label: slot.dateLabel ?? slot.date }))

    const tutorOptions = availableSlots
        .filter((slot, index, slots) => slots.findIndex((candidate) => candidate.tutor === slot.tutor) === index)
        .map((slot) => slot.tutor)

    return (
        <main className="min-h-screen bg-[var(--color-background)]">
            <MakeSidebar profileType={profileType || 'Student'} expanded={sidebarExpanded} setExpanded={setSidebarExpanded} onLogout={handleLogout} isLoggingOut={isLoggingOut} />
            <section className={`min-h-screen pl-0 transition-all ${sidebarExpanded ? 'sm:pl-[280px]' : 'sm:pl-[84px]'}`}>
                <div className="mx-auto max-w-[1200px] px-5 py-6 sm:px-10 sm:py-10">
                    <header className="mb-6">
                        <span className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-primary)]">Student workspace</span>
                        <h1 className="mb-2 mt-2 text-3xl font-bold text-[var(--color-text-primary)] sm:text-[42px]">Find your next lesson</h1>
                        <p className="m-0 max-w-xl leading-relaxed text-[var(--color-text-secondary)]">Search available tutors and choose a time that works for you.</p>
                    </header>

                    <SlotFilters
                        searchQuery={searchQuery}
                        tutorFilter={tutorFilter}
                        dateFilter={dateFilter}
                        formatFilter={formatFilter}
                        tutorOptions={tutorOptions}
                        dateOptions={dateOptions}
                        onSearchChange={setSearchQuery}
                        onTutorChange={setTutorFilter}
                        onDateChange={setDateFilter}
                        onFormatChange={setFormatFilter}
                        onClear={clearFilters}
                    />

                    <div className="mb-4 mt-8 flex items-center justify-between gap-4">
                        <h2 className="m-0 text-xl font-bold text-[var(--color-text-primary)]">Available time slots</h2>
                        <span className="text-sm text-[var(--color-text-secondary)]">{filteredSlots.length} {filteredSlots.length === 1 ? 'slot' : 'slots'}</span>
                    </div>
                    {isLoadingSlots ? (
                        <div className="rounded-2xl border border-[var(--color-border)] bg-white px-6 py-12 text-center" role="status">
                            <p className="m-0 text-sm text-[var(--color-text-secondary)]">Loading available slots...</p>
                        </div>
                    ) : slotsError ? (
                        <div className="rounded-2xl border border-red-200 bg-white px-6 py-12 text-center" role="alert">
                            <h2 className="m-0 text-lg font-bold text-[var(--color-text-primary)]">Unable to load slots</h2>
                            <p className="mb-0 mt-2 text-sm text-[var(--color-danger)]">{slotsError}</p>
                        </div>
                    ) : filteredSlots.length > 0 ? (
                        <SlotList slots={filteredSlots} />
                    ) : (
                        <EmptySlotsState />
                    )}
                </div>
            </section>
        </main>
    )
}

export default AvailableSlotPage

