import { useState } from 'react'
import { PersonalInfo } from '@/types/userDetails'
import { Plus, X } from 'lucide-react'

interface PersonalInfoInputProps {
  userDetails: Partial<PersonalInfo>
  onChange: (details: Partial<PersonalInfo>) => void
}

export default function PersonalInfoInput({ userDetails, onChange }: PersonalInfoInputProps) {
  const handleChange = <K extends keyof PersonalInfo>(key: K, value: PersonalInfo[K]) => {
    onChange({ ...userDetails, [key]: value })
  }

  const handleArrayChange = (key: keyof PersonalInfo, values: string[]) => {
    onChange({ ...userDetails, [key]: values })
  }

  // Input field for array values (Languages & Interests)
  const ArrayInput = ({ label, keyName }: { label: string; keyName: keyof PersonalInfo }) => {
    const [inputValue, setInputValue] = useState('')
    const values: string[] = (userDetails[keyName] as string[]) ?? []

    const addValue = () => {
      if (inputValue.trim() && !values.includes(inputValue.trim())) {
        handleArrayChange(keyName, [...values, inputValue.trim()])
        setInputValue('')
      }
    }

    const removeValue = (index: number) => {
      const updatedValues = values.filter((_, i) => i !== index)
      handleArrayChange(keyName, updatedValues)
    }

    return (
      <div>
        <label className="block text-sm font-medium">{label}</label>
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Enter ${label.toLowerCase()}`}
            className="border p-2 rounded w-full"
            onKeyDown={(e) => e.key === 'Enter' && addValue()}
          />
          <button
            type="button"
            onClick={addValue}
            className="bg-blue-500 text-white px-3 py-2 rounded"
          >
            <Plus size={16} />
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {values.map((value, index) => (
            <span key={index} className="bg-gray-200 px-3 py-1 rounded flex items-center gap-1">
              {value}
              <button type="button" onClick={() => removeValue(index)} className="text-red-500">
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              label: 'Full Name',
              key: 'fullName',
              type: 'text',
              placeholder: 'Enter your full name',
            },
            { label: 'Email', key: 'email', type: 'email', placeholder: 'Enter your email' },
            { label: 'Phone', key: 'phone', type: 'tel', placeholder: 'Enter your phone number' },
            { label: 'Date of Birth', key: 'dob', type: 'date', placeholder: '' },
            { label: 'Address', key: 'address', type: 'text', placeholder: 'Enter your address' },
          ].map(({ label, key, type, placeholder }) => (
            <label key={key} className="block">
              <span className="text-sm font-medium">{label}</span>
              <input
                type={type}
                value={(userDetails[key as keyof PersonalInfo] as string) || ''}
                onChange={(e) => handleChange(key as keyof PersonalInfo, e.target.value)}
                className="border p-2 w-full rounded"
                placeholder={placeholder}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Professional Profiles */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Professional Profiles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'LinkedIn', key: 'linkedin', placeholder: 'Enter LinkedIn profile link' },
            { label: 'GitHub', key: 'github', placeholder: 'Enter GitHub profile link' },
            { label: 'Portfolio', key: 'portfolio', placeholder: 'Enter portfolio website link' },
            { label: 'Twitter', key: 'twitter', placeholder: 'Enter Twitter profile link' },
          ].map(({ label, key, placeholder }) => (
            <label key={key} className="block">
              <span className="text-sm font-medium">{label}</span>
              <input
                type="url"
                value={(userDetails[key as keyof PersonalInfo] as string) || ''}
                onChange={(e) => handleChange(key as keyof PersonalInfo, e.target.value)}
                className="border p-2 w-full rounded"
                placeholder={placeholder}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Additional Details */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Additional Details</h3>
        <label className="block">
          <span className="text-sm font-medium">Summary</span>
          <textarea
            value={userDetails.summary || ''}
            onChange={(e) => handleChange('summary', e.target.value)}
            className="border p-2 w-full rounded"
            placeholder="Write a short summary about yourself"
            rows={3}
          />
        </label>

        {/* Languages & Interests using reusable array input */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <ArrayInput label="Languages" keyName="languages" />
          <ArrayInput label="Interests" keyName="interests" />
        </div>
      </div>
    </div>
  )
}
