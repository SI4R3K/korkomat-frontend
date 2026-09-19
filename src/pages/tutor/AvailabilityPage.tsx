import { useNavigate } from "react-router-dom"
import { useEffect, useState, type SubmitEvent } from "react"


import type { AvailableSlot, CreateAvailableSlotRequest } from '../../types/availableSlot'
import EmptySlotsState from '../../components/ui/slot/EmptySlotsState'
import SlotList from '../../components/ui/slot/SlotList'
import { useAuth } from "../../context/AuthContext"

import MakeSidebar from "../../components/ui/sidebar/Sidebar"
import mapApiSlot from "../../util/ApiSlotMapper"
import { tutorCreateSlot, tutorGetSlots } from "../../api/slotApi"

function AvailabilityPage() {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const [sidebarExpanded, setSidebarExpanded] = useState(true)
    const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([])
    const [isLoadingSlots, setIsLoadingSlots] = useState(true)
    const [slotsError, setSlotsError] = useState('')
    const [isCreatingSlot, setIsCreatingSlot] = useState(false)
    const [createSlotError, setCreateSlotError] = useState('')
    const [createSlotSuccess, setCreateSlotSuccess] = useState('')
    const [newSlot, setNewSlot] = useState<CreateAvailableSlotRequest>({
        startTime: '',
        endTime: '',
        type: 'ONLINE',
    })

    const loadSlots = async () => {
        try {
            setSlotsError('')
            const response = await tutorGetSlots()
            setAvailableSlots(response.allAvailableSlots.map(mapApiSlot))
        } catch (error) {
            setSlotsError(error instanceof Error ? error.message : 'Could not load available slots.')
        } finally {
            setIsLoadingSlots(false)
        }
    }

    useEffect(() => {
        void loadSlots()
    }, [])

    const handleCreateSlot = async (
        event: SubmitEvent<HTMLFormElement>
    ) => {
        event.preventDefault()
        setCreateSlotError('')
        setCreateSlotSuccess('')

        if (new Date(newSlot.endTime) <= new Date(newSlot.startTime)) {
            setCreateSlotError('End time must be later than start time.')
            return
        }

        setIsCreatingSlot(true)
        try {
            await tutorCreateSlot({
                ...newSlot,
                startTime: new Date(newSlot.startTime).toISOString(),
                endTime: new Date(newSlot.endTime).toISOString(),
            })
            setNewSlot({ startTime: '', endTime: '', type: 'ONLINE' })
            setCreateSlotSuccess('Slot added successfully.')
            await loadSlots()
        } catch (error) {
            setCreateSlotError(error instanceof Error ? error.message : 'Could not create available slot.')
        } finally {
            setIsCreatingSlot(false)
        }
    }

    const handleLogout = async () => {
        setIsLoggingOut(true)
        await logout()
        navigate('/login', {replace: true})
    }

    return (
        <main className="min-h-screen bg-[var(--color-background)]">
            <MakeSidebar profileType="Tutor" expanded={sidebarExpanded} setExpanded={setSidebarExpanded} onLogout={handleLogout} isLoggingOut={isLoggingOut}/>
            <section className={`min-h-screen pl-0 transition-all ${sidebarExpanded ? 'sm:pl-[280px]' : 'sm:pl-[84px]'}`}>
                <div className="mx-auto max-w-[1200px] px-5 py-6 sm:px-10 sm:py-10">
                    <header className="mb-6">
                        <span className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-primary)]">Tutor workspace</span>
                        <h1 className="mb-2 mt-2 text-3xl font-bold text-[var(--color-text-primary)] sm:text-[42px]">Manage your availability</h1>
                        <p className="m-0 max-w-xl leading-relaxed text-[var(--color-text-secondary)]">Add times when students can book a lesson with you.</p>
                    </header>

                    <form onSubmit={handleCreateSlot} className="rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-[0_8px_24px_rgb(25_43_58/8%)] sm:p-6">
                        <h2 className="m-0 text-xl font-bold text-[var(--color-text-primary)]">Add a time slot</h2>
                        <div className="mt-4 grid gap-4 sm:grid-cols-3">
                            <label className="flex flex-col gap-2 text-sm font-bold text-[var(--color-text-primary)]" htmlFor="slot-start-time">
                                Start time
                                <input id="slot-start-time" required type="datetime-local" value={newSlot.startTime} onChange={(event) => setNewSlot({ ...newSlot, startTime: event.target.value })} className="rounded-xl border border-[var(--color-border)] bg-white px-3 py-3 font-normal outline-none focus:border-[var(--color-border-focus)] focus:ring-4 focus:ring-[var(--color-primary-soft)]" />
                            </label>
                            <label className="flex flex-col gap-2 text-sm font-bold text-[var(--color-text-primary)]" htmlFor="slot-end-time">
                                End time
                                <input id="slot-end-time" required type="datetime-local" value={newSlot.endTime} onChange={(event) => setNewSlot({ ...newSlot, endTime: event.target.value })} className="rounded-xl border border-[var(--color-border)] bg-white px-3 py-3 font-normal outline-none focus:border-[var(--color-border-focus)] focus:ring-4 focus:ring-[var(--color-primary-soft)]" />
                            </label>
                            <label className="flex flex-col gap-2 text-sm font-bold text-[var(--color-text-primary)]" htmlFor="slot-type">
                                Lesson type
                                <select id="slot-type" value={newSlot.type} onChange={(event) => setNewSlot({ ...newSlot, type: event.target.value as CreateAvailableSlotRequest['type'] })} className="rounded-xl border border-[var(--color-border)] bg-white px-3 py-3 font-normal outline-none focus:border-[var(--color-border-focus)] focus:ring-4 focus:ring-[var(--color-primary-soft)]">
                                    <option value="ONLINE">Online</option>
                                    <option value="IN_PERSON">In person</option>
                                    <option value="OPTIONAL">Online or in person</option>
                                </select>
                            </label>
                        </div>
                        {createSlotError && <p className="mb-0 mt-4 text-sm text-[var(--color-danger)]" role="alert">{createSlotError}</p>}
                        {createSlotSuccess && <p className="mb-0 mt-4 text-sm text-green-700" role="status">{createSlotSuccess}</p>}
                        <button type="submit" disabled={isCreatingSlot} className="mt-5 rounded-xl bg-[var(--color-primary)] px-5 py-3 font-bold text-white transition hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:opacity-50">
                            {isCreatingSlot ? 'Adding slot...' : 'Add slot'}
                        </button>
                    </form>

                    <div className="mb-4 mt-8 flex items-center justify-between gap-4">
                        <h2 className="m-0 text-xl font-bold text-[var(--color-text-primary)]">Provided time slots</h2>
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
                        ) : availableSlots.length > 0 ? (
                            <SlotList slots={availableSlots} />
                        ) : (
                            <EmptySlotsState />
                        )}
                </div>
            </section>
        </main>
    )
}

export default AvailabilityPage
