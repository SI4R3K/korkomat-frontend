import SelectProfileContainer from "../../components/ui/SelectProfileContainer"

function ProfileSelectionPage() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-[var(--color-background)] bg-[linear-gradient(135deg,var(--color-primary-soft),transparent_38%)] px-4 pb-9 pt-12 sm:px-6 sm:pb-12 sm:pt-[72px]">
            <section className="mb-7 w-full max-w-[720px] text-center sm:mb-10" aria-labelledby="profile-selection-title">
                <span className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-primary)]">Korkomat account</span>
                <h1 id="profile-selection-title" className="mb-3 mt-3 text-4xl font-bold leading-tight text-[var(--color-text-primary)] sm:text-[48px]">Hi, {localStorage.getItem('fullName')} choose your profile</h1>
                <p className="mx-auto my-0 max-w-[540px] text-[17px] leading-relaxed text-[var(--color-text-secondary)]">
                    Select the profile you would like to use. You can switch between
                    your profiles whenever you need to.
                </p>
            </section>

            <section className="grid w-full max-w-[820px] grid-cols-1 gap-5 sm:grid-cols-2" aria-label="Available profiles">
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