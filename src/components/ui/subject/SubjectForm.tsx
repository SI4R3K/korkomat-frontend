import type { Subject, SubjectLevel } from "../../../types/subject"
import { type SubmitEvent } from "react"

interface SubjectFormProps {
    handleAddSubject: (event: SubmitEvent<HTMLFormElement>) => void,
    handleSubjectChange: (subjectId: string) => void,
    handleDescriptionChange: (description: string) => void,
    handleLevelChange: (level: SubjectLevel | '') => void,
    selectedSubjectId: string,
    selectedLevel: SubjectLevel | '',
    subjects: Subject[],
    description: string,
    createSubjectError: string,
}

const subjectLevels: SubjectLevel[] = [
    'PRIMARY_SCHOOL',
    'EIGHT_GRADE_EXAM',
    'HIGH_SCHOOL',
    'MATURA_EXAM',
    'UNIVERSITY',
]

const levelLabels: Record<SubjectLevel, string> = {
    PRIMARY_SCHOOL: 'Primary school',
    EIGHT_GRADE_EXAM: 'Eighth-grade exam',
    HIGH_SCHOOL: 'High school',
    MATURA_EXAM: 'Matura exam',
    UNIVERSITY: 'University',
}

function SubjectForm({
    handleAddSubject,
    handleSubjectChange,
    handleDescriptionChange,
    handleLevelChange,
    selectedSubjectId,
    selectedLevel,
    subjects,
    description,
    createSubjectError,
}: SubjectFormProps) {
    return (
        <form onSubmit={handleAddSubject} className="rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-[0_8px_24px_rgb(25_43_58/8%)] sm:p-6">
            <h2 className="m-0 text-xl font-bold text-[var(--color-text-primary)]">Add a subject</h2>
            <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
                <label className="flex flex-col gap-2 text-sm font-bold text-[var(--color-text-primary)]" htmlFor="subject-name">
                    Subject name
                    <select id="subject-name" required value={selectedSubjectId} onChange={(event) => handleSubjectChange(event.target.value)} className="rounded-xl border border-[var(--color-border)] bg-white px-3 py-3 font-normal outline-none focus:border-[var(--color-border-focus)] focus:ring-4 focus:ring-[var(--color-primary-soft)]">
                        <option value="">Select a subject</option>
                        {subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.name}</option>)}
                    </select>
                </label>

                <fieldset>
                    <label className="flex flex-col gap-2 text-sm font-bold text-[var(--color-text-primary)]" htmlFor="subject-level">
                        Level you teach
                        <select id="subject-level" required value={selectedLevel} onChange={(event) => handleLevelChange(event.target.value as SubjectLevel | '')} className="rounded-xl border border-[var(--color-border)] bg-white px-3 py-3 font-normal outline-none focus:border-[var(--color-border-focus)] focus:ring-4 focus:ring-[var(--color-primary-soft)]">
                            <option value="">Select a level</option>
                            {subjectLevels.map((level) => <option key={level} value={level}>{levelLabels[level]}</option>)}
                        </select>
                    </label>
                </fieldset>
            </div>

            <label className="mt-5 flex flex-col gap-2 text-sm font-bold text-[var(--color-text-primary)]" htmlFor="subject-description">
                Short description
                <textarea id="subject-description" required rows={4} maxLength={500} value={description} onChange={(event) => handleDescriptionChange(event.target.value)} placeholder="Describe what students can learn with you..." className="resize-y rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 font-normal outline-none focus:border-[var(--color-border-focus)] focus:ring-4 focus:ring-[var(--color-primary-soft)]" />
            </label>
            {createSubjectError && <p className="mb-0 mt-4 text-sm text-[var(--color-danger)]" role="alert">{createSubjectError}</p>}
            <button type="submit" className="mt-5 rounded-xl bg-[var(--color-primary)] px-5 py-3 font-bold text-white transition hover:bg-[var(--color-primary-hover)]">Add subject</button>
        </form>
    )
}

export default SubjectForm