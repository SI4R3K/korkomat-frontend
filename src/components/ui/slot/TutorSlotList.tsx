import type { AvailableSlot } from '../../../types/availableSlot'
import TutorSlotComponent from './TutorSlotComponent'

type TutorSlotListProps = {
    slots: AvailableSlot[]
    slotLabel?: string
    deletingSlotId: number | null
    onDelete: (slotId:number) => void
}

function TutorSlotList({ 
    slots, 
    slotLabel,
    deletingSlotId,
    onDelete,
}: TutorSlotListProps) {
    return (
        <section className="grid gap-4 md:grid-cols-2" aria-label="Available time slots">
            {slots.map((slot) => (
                <TutorSlotComponent 
                    key={slot.id} 
                    slot={slot} 
                    slotLabel={slotLabel}
                    deletingSlotId={deletingSlotId}
                    onDelete={onDelete} 
                />
            ))}
        </section>
    )
}

export default TutorSlotList
