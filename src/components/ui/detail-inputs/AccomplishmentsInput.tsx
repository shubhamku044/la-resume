import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { Certification } from '@/types/userDetails'

interface AccomplishmentsInputProps {
  accomplishments: string[]
  certifications: Certification[]
  onAccomplishmentsChange: (accomplishments: string[]) => void
  onCertificationsChange: (certifications: Certification[]) => void
}

export default function AccomplishmentsInput({
  accomplishments,
  certifications,
  onAccomplishmentsChange,
  onCertificationsChange,
}: AccomplishmentsInputProps) {
  return (
    <div>
      {/* Accomplishments Section */}
      <label className="block text-sm font-medium">Accomplishments</label>
      <StringListInput
        items={accomplishments}
        placeholder="Add an accomplishment"
        onChange={onAccomplishmentsChange}
      />

      {/* Certifications Section */}
      <label className="block text-sm font-medium mt-4">Certifications</label>
      <CertificationInput
        certifications={certifications}
        onCertificationsChange={onCertificationsChange}
      />
    </div>
  )
}

// ✅ Reusable String List Input (for Accomplishments)
function StringListInput({
  items,
  placeholder,
  onChange,
}: {
  items: string[]
  placeholder: string
  onChange: (items: string[]) => void
}) {
  const [newItem, setNewItem] = useState('')

  const addItem = () => {
    const trimmedItem = newItem.trim()
    if (trimmedItem && !items.includes(trimmedItem)) {
      onChange([...items, trimmedItem])
      setNewItem('')
    }
  }

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index))
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addItem()
    }
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={placeholder}
          className="border p-2 rounded w-full"
        />
        <button onClick={addItem} className="bg-gray-500 text-white px-3 py-2 rounded">
          <Plus size={16} />
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span key={index} className="bg-gray-200 px-3 py-1 rounded flex items-center gap-1">
            {item}
            <button onClick={() => removeItem(index)} className="text-red-500">
              <X size={12} />
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}

// ✅ Certification Input Component
function CertificationInput({
  certifications,
  onCertificationsChange,
}: {
  certifications: Certification[]
  onCertificationsChange: (certifications: Certification[]) => void
}) {
  const addCertification = () => {
    onCertificationsChange([
      ...certifications,
      { title: '', provider: '', date: '', credentialUrl: '' },
    ])
  }

  const updateCertification = (index: number, key: keyof Certification, value: string) => {
    const updatedCertifications = certifications.map((cert, i) =>
      i === index ? { ...cert, [key]: value } : cert
    )
    onCertificationsChange(updatedCertifications)
  }

  const removeCertification = (index: number) => {
    onCertificationsChange(certifications.filter((_, i) => i !== index))
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      ;(e.target as HTMLInputElement).blur()
    }
  }

  return (
    <div>
      {certifications.map((cert, index) => (
        <div key={index} className="border p-4 rounded mb-3 relative">
          <button
            onClick={() => removeCertification(index)}
            className="absolute top-2 right-2 text-red-500"
          >
            <X size={16} />
          </button>

          {/* ✅ Labels Placed Outside */}
          <label className="text-sm font-medium">Certification Title</label>
          <input
            type="text"
            value={cert.title}
            onChange={(e) => updateCertification(index, 'title', e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter certification title"
            className="border p-2 rounded w-full mb-2"
          />

          <label className="text-sm font-medium">Provider</label>
          <input
            type="text"
            value={cert.provider}
            onChange={(e) => updateCertification(index, 'provider', e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter provider name"
            className="border p-2 rounded w-full mb-2"
          />

          <label className="text-sm font-medium">Date</label>
          <input
            type="date"
            value={cert.date}
            onChange={(e) => updateCertification(index, 'date', e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />

          <label className="text-sm font-medium">Credential URL (Optional)</label>
          <input
            type="text"
            value={cert.credentialUrl || ''}
            onChange={(e) => updateCertification(index, 'credentialUrl', e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter credential URL"
            className="border p-2 rounded w-full mb-2"
          />
        </div>
      ))}
      <button onClick={addCertification} className="bg-blue-500 text-white px-3 py-2 rounded mt-2">
        <Plus size={16} className="mr-2 inline" /> Add Certification
      </button>
    </div>
  )
}
