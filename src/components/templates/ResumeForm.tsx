'use client' // Mark this as a Client Component

import { useState } from 'react'
import { resumes } from '@/data/resumes' // Assuming your resume data is imported from the correct path
import { ChangeEvent } from 'react'

interface FieldProps {
  field: string
  label: string
  value: string | number
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Field = ({ field, label, value, onChange }: FieldProps) => (
  <div className="mb-4">
    <label htmlFor={field} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type="text"
      id={field}
      name={field}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
  </div>
)

interface ResumeFormProps {
  templateKey: string // Key to select the template
}

export default function ResumeForm({ templateKey }: ResumeFormProps) {
  const resumeTemplate = resumes[templateKey] // Get the resume template based on the templateKey

  // State initialization happens unconditionally
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    degree: '',
    university: '',
    year: '',
    job_title: '',
    company: '',
    duration: '',
    // Add other fields here based on your resume data structure
  })

  const handleFieldChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  // Ensure that the template exists before rendering form
  if (!resumeTemplate) {
    return (
      <div className="text-red-500">
        <h2>Error: Resume template not found.</h2>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{resumeTemplate.name}</h1>

      <form className="space-y-6">
        {Object.entries(resumeTemplate.sections).map(([sectionKey, section]) => (
          <div key={sectionKey}>
            <h2 className="text-lg font-semibold">{section.label}</h2>
            {Array.isArray(section.fields) ? (
              section.fields.map((fieldObject, index) => {
                const fieldName = Object.keys(fieldObject)[0] // Extract the field name
                return (
                  <Field
                    key={`${sectionKey}-${fieldName}-${index}`} // Use a unique key
                    field={fieldName}
                    label={fieldObject[fieldName]} // You can replace this with more descriptive labels if needed
                    value={formData[fieldName] || ''} // Bind the value to state
                    onChange={(e) => handleFieldChange(fieldName, e.target.value)}
                  />
                )
              })
            ) : (
              <p>No fields available for this section.</p>
            )}
          </div>
        ))}
      </form>

      {/* Resume Preview */}
      <div className="mt-6 p-6 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-bold">Resume Preview</h2>
        <div>
          <h3 className="text-lg font-semibold">Personal Info</h3>
          <p>Name: {formData.name}</p>
          <p>Email: {formData.email}</p>
          <p>Phone: {formData.phone}</p>
          <p>LinkedIn: {formData.linkedin}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Education</h3>
          <p>Degree: {formData.degree}</p>
          <p>University: {formData.university}</p>
          <p>Year: {formData.year}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Experience</h3>
          <p>Job Title: {formData.job_title}</p>
          <p>Company: {formData.company}</p>
          <p>Duration: {formData.duration}</p>
        </div>

        {/* Render other sections similarly */}
      </div>
    </div>
  )
}
