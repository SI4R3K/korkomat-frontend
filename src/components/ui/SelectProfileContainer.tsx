
import './SelectProfileContainer.css'

type SelectProfileProps = {
    profileType: string,
    description: string,
}

function SelectProfileContainer({
    profileType,
    description,
}: SelectProfileProps) {
    
    return (
        <div
            className="profile-card"
        >
            <div className="profile-card__icon" aria-hidden="true">
                {profileType.charAt(0)}
            </div>
            <div className="profile-card__content">
                <h2>{profileType}</h2>
                <p>{description}</p>
            </div>
            <button className="profile-card__button" type="button">
                Select profile
                <span aria-hidden="true">-&gt;</span>
            </button>
        </div>
    )
}

export default SelectProfileContainer