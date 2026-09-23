import type { AvailableSlot } from '../../../types/availableSlot'
import ReservationForm from './ReservationForm'
import ReservationHeader from './ReservationHeader'
import ReservationInfo from './ReservationInfo'

type ReservationModalProps = {
    slot: AvailableSlot
    onClose: () => void
}

function ReservationModal({ slot, onClose }: ReservationModalProps) {

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[rgb(25_43_58/45%)] p-0 sm:items-center sm:p-5" role="presentation" onMouseDown={onClose}>
            <section
                aria-labelledby="reservation-title"
                aria-modal="true"
                className="max-h-[90vh] w-full overflow-y-auto rounded-t-3xl bg-white p-6 shadow-[0_24px_60px_rgb(25_43_58/20%)] sm:max-w-lg sm:rounded-3xl sm:p-8"
                role="dialog"
                onMouseDown={(event) => event.stopPropagation()}
            >
                <ReservationHeader onClose={onClose} />

                <ReservationInfo slot={slot} />
       
                <ReservationForm slot={slot} onClose={onClose} />
            </section>
        </div>
    )
}

export default ReservationModal