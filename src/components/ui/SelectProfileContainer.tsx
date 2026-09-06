
import './SelectProfileContainer.css'
import { useNavigate } from 'react-router-dom'
import { useUserDetails } from '../../context/UserContext'

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

        console.log(studentProfileId)
        console.log(tutorProfileId)
    }
    
    return (
        <div
            className="profile-card"
            aria-label={`${profileType} profile`}
        >
            <div className="profile-card__icon" aria-hidden="true">
                {profileType.charAt(0)}
            </div>
            <div className="profile-card__content">
                <h2>{profileType}</h2>
                <p>{description}</p>
            </div>
            <button className="profile-card__button" type="button" onClick={handleSelect}>
                Select profile
                <span aria-hidden="true">-&gt;</span>
            </button>
        </div>
    )
}

export default SelectProfileContainer