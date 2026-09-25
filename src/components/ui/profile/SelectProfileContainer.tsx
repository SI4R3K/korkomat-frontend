
import { useNavigate } from 'react-router-dom'
import { useUserDetails } from '../../../context/UserContext'

type SelectProfileProps = {
    profileType: 'Student' | 'Tutor',
    description: string,
}

function SelectProfileContainer({
    profileType,
    description,
}: SelectProfileProps) {
    const navigate = useNavigate()
    const { studentProfileId, tutorProfileId } = useUserDetails()
    const profileKey = profileType.toLowerCase() as 'student' | 'tutor'

    const handleSelect = () => {
        const profileExists = profileKey === 'student'
            ? studentProfileId
            : tutorProfileId

        navigate(profileExists
            ? `/${profileKey}/dashboard`
            : `/register/${profileKey}`)
    }
    
    return (
        <div
            className="group grid min-h-[230px] grid-cols-[auto_1fr] gap-6 rounded-2xl border border-[var(--color-border)] bg-white p-7 shadow-[0_12px_28px_rgb(25_43_58/8%)] transition duration-200 hover:-translate-y-1 hover:border-[var(--color-primary)] hover:shadow-[0_16px_34px_rgb(25_43_58/14%)]"
            aria-label={`${profileType} profile`}
        >
            <div className="grid size-[52px] place-items-center rounded-[14px] bg-[var(--color-primary)] text-[22px] font-bold text-white" aria-hidden="true">
                {profileType.charAt(0)}
            </div>
            <div>
                <h2 className="mb-2 mt-0 text-[23px] font-bold text-[var(--color-text-primary)]">{profileType}</h2>
                <p className="m-0 max-w-[240px] leading-relaxed text-[var(--color-text-secondary)]">{description}</p>
            </div>
            <button className="col-span-full flex w-full items-center justify-between border-0 border-t border-[var(--color-border)] bg-transparent py-3 text-left font-bold text-[var(--color-primary)] transition hover:text-[var(--color-primary-hover)]" type="button" onClick={handleSelect}>
                Select profile
                <span aria-hidden="true" className="text-xl transition-transform group-hover:translate-x-1">-&gt;</span>
            </button>
        </div>
    )
}

export default SelectProfileContainer