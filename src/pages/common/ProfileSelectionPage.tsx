import SelectProfileContainer from "../../components/ui/SelectProfileContainer"
import './ProfileSelectionPage.css'

function ProfileSelectionPage() {
    return (
        <main className="profile-selection">
            <section className="profile-selection__intro" aria-labelledby="profile-selection-title">
                <span className="profile-selection__eyebrow">Korkomat account</span>
                <h1 id="profile-selection-title">Hi, {localStorage.getItem('fullName')} choose your profile</h1>
                <p>
                    Select the profile you would like to use. You can switch between
                    your profiles whenever you need to.
                </p>
            </section>

            <section className="profile-selection__options" aria-label="Available profiles">
                <SelectProfileContainer 
                    profileType="Student"
                    description="Browse tutors and find available lessons"
                />
                <SelectProfileContainer
                    profileType="Tutor"
                    description='Manage lessons and availability'
                />
            </section>

        </main>
    )
}

export default ProfileSelectionPage