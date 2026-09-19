import type { AvailableSlot } from '../../../types/availableSlot'
import SlotComponent from './SlotComponent'

type SlotListProps = {
    slots: AvailableSlot[]
}

function SlotList({ slots }: SlotListProps) {
    return (
        <section className="grid gap-4 md:grid-cols-2" aria-label="Available time slots">
            {slots.map((slot) => (
                <SlotComponent key={slot.id} slot={slot} />
            ))}
        </section>
    )
}

export default SlotList
