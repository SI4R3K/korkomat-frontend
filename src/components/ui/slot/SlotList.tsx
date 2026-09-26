import type { AvailableSlot } from '../../../types/availableSlot'
import SlotComponent from './SlotComponent'

type SlotListProps = {
    slots: AvailableSlot[]
    slotLabel?: string
    onBookSlot?: (slot: AvailableSlot) => void
}

function SlotList({ 
    slots, 
    slotLabel,
    onBookSlot 
}: SlotListProps) {
    return (
        <section className="grid gap-4 md:grid-cols-2" aria-label="Available time slots">
            {slots.map((slot) => (
                <SlotComponent key={slot.id} slot={slot} slotLabel={slotLabel} showBookingScreen={onBookSlot ? () => onBookSlot(slot) : undefined} />
            ))}
        </section>
    )
}

export default SlotList
