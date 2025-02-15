import { Plus, X } from 'lucide-react'
import { Education } from '@/types/userDetails'

interface EducationInputProps {
  education: Education[]
  onChange: (education: Education[]) => void
}

export default function EducationInput({ education, onChange }: EducationInputProps) {
  const addEducation = () => {
    onChange([
      ...education,
      {
        school: '',
        degree: '',
        fieldOfStudy: '',
        startYear: new Date().getFullYear(),
        endYear: new Date().getFullYear(),
        location: '',
      } as Education,
    ])
  }

  const updateEducation = <K extends keyof Education>(
    index: number,
    key: K,
    value: Education[K]
  ) => {
    const updatedEducation = education.map((edu, i) =>
      i === index ? { ...edu, [key]: value } : edu
    )
    onChange(updatedEducation)
  }

  const removeEducation = (index: number) => {
    onChange(education.filter((_, i) => i !== index))
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      ;(e.target as HTMLInputElement).blur()
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      {education.map((edu, index) => (
        <div key={index} className="relative mb-4 w-full max-w-3xl rounded border p-6">
          <button
            onClick={() => removeEducation(index)}
            className="absolute right-2 top-2 text-red-500"
          >
            <X size={16} />
          </button>

          <div className="mb-3">
            <label className="block font-medium">School / University</label>
            <input
              type="text"
              value={edu.school}
              onChange={(e) => updateEducation(index, 'school', e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full rounded border p-2"
            />
          </div>

          <div className="mb-3">
            <label className="block font-medium">Degree</label>
            <input
              type="text"
              value={edu.degree}
              onChange={(e) => updateEducation(index, 'degree', e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full rounded border p-2"
            />
          </div>

          <div className="mb-3">
            <label className="block font-medium">Field of Study</label>
            <input
              type="text"
              value={edu.fieldOfStudy}
              onChange={(e) => updateEducation(index, 'fieldOfStudy', e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full rounded border p-2"
            />
          </div>

          <div className="mb-3 flex gap-4">
            <div className="flex-1">
              <label className="block font-medium">Start Year</label>
              <input
                type="number"
                value={edu.startYear || ''}
                onChange={(e) => updateEducation(index, 'startYear', Number(e.target.value))}
                onKeyDown={handleKeyPress}
                className="w-full rounded border p-2"
              />
            </div>
            <div className="flex-1">
              <label className="block font-medium">End Year</label>
              <input
                type="number"
                value={edu.endYear || ''}
                onChange={(e) => updateEducation(index, 'endYear', Number(e.target.value))}
                onKeyDown={handleKeyPress}
                className="w-full rounded border p-2"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="block font-medium">Location</label>
            <input
              type="text"
              value={edu.location}
              onChange={(e) => updateEducation(index, 'location', e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full rounded border p-2"
            />
          </div>

          <div className="mb-3 flex gap-4">
            <div className="flex-1">
              <label className="block font-medium">GPA (if applicable)</label>
              <input
                type="number"
                value={edu.gpa ?? ''}
                onChange={(e) => {
                  const value = e.target.value ? Number(e.target.value) : undefined
                  updateEducation(index, 'gpa', value)
                  if (value !== undefined) updateEducation(index, 'percentage', undefined)
                }}
                onKeyDown={handleKeyPress}
                className="w-full rounded border p-2"
              />
            </div>

            <div className="flex-1">
              <label className="block font-medium">Percentage (if applicable)</label>
              <input
                type="number"
                value={edu.percentage ?? ''}
                onChange={(e) => {
                  const value = e.target.value ? Number(e.target.value) : undefined
                  updateEducation(index, 'percentage', value)
                  if (value !== undefined) updateEducation(index, 'gpa', undefined)
                }}
                onKeyDown={handleKeyPress}
                className="w-full rounded border p-2"
              />
            </div>
          </div>
        </div>
      ))}

      <button onClick={addEducation} className="mt-4 rounded bg-blue-500 px-4 py-2 text-white">
        <Plus size={16} className="mr-2 inline" /> Add Education
      </button>
    </div>
  )
}
