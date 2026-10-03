import Button from "../button/Button"

interface RejectModalProps {
    typeName: string
    onReject: () => void
    onClose: () => void
}

function RejectModal({
    typeName,
    onReject,
    onClose
}: RejectModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgb(25_43_58/45%)] p-4 sm:p-5" role="presentation" onMouseDown={onClose}>
            <section
                aria-labelledby="delete-title"
                aria-modal="true"
                className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_24px_60px_rgb(25_43_58/20%)] sm:p-8"
                role="dialog"
                onMouseDown={(event) => event.stopPropagation()}
            >
                <h2 id="delete-title" className="m-0 text-xl font-bold text-[var(--color-text-primary)] sm:text-2xl">Are you sure you want to reject this {typeName}?</h2>
                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button variant="danger" onClick={onReject}>Reject</Button>
                </div>
            </section>
        </div>
    )
}

export default RejectModal