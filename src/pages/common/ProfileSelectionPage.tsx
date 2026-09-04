import { Link } from 'react-router-dom'

import SelectProfileContainer from "../../components/ui/SelectProfileContainer"
import './ProfileSelectionPage.css'

function ProfileSelectionPage() {
    return (
        <main className="profile-selection">
            <section className="profile-selection__intro" aria-labelledby="profile-selection-title">
                <span className="profile-selection__eyebrow">Korkomat account</span>
                <h1 id="profile-selection-title">Choose your profile</h1>
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

            <p className="profile-selection__register">
                Don&apos;t have a profile yet? <Link to="/register">Create one</Link>
            </p>
        </main>
    )
}

export default ProfileSelectionPage