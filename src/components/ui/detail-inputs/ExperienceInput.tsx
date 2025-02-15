import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Experience } from '@/types/userDetails';

interface ExperienceInputProps {
  experience: Experience[];
  onChange: (experience: Experience[]) => void;
}

export default function ExperienceInput({ experience, onChange }: ExperienceInputProps) {
  const addExperience = () => {
    onChange([
      ...experience,
      { company: '', role: '', startDate: '', endDate: '', responsibilities: [], location: '' },
    ]);
  };

  const updateExperience = <K extends keyof Experience>(
    index: number,
    key: K,
    value: Experience[K]
  ) => {
    const updatedExperience = experience.map((exp, i) =>
      i === index ? { ...exp, [key]: value } : exp
    );
    onChange(updatedExperience);
  };

  const removeExperience = (index: number) => {
    onChange(experience.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      {experience.map((exp, index) => (
        <div key={index} className="relative mb-4 w-full max-w-3xl rounded border p-6">
          <button
            onClick={() => removeExperience(index)}
            className="absolute right-2 top-2 text-red-500"
          >
            <X size={16} />
          </button>

          <div className="mb-3">
            <label className="block font-medium">Company Name</label>
            <input
              type="text"
              value={exp.company}
              onChange={(e) => updateExperience(index, 'company', e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full rounded border p-2"
            />
          </div>

          <div className="mb-3">
            <label className="block font-medium">Job Role</label>
            <input
              type="text"
              value={exp.role}
              onChange={(e) => updateExperience(index, 'role', e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full rounded border p-2"
            />
          </div>

          <div className="mb-3 flex gap-4">
            <div className="flex-1">
              <label className="block font-medium">Start Date</label>
              <input
                type="date"
                value={exp.startDate}
                onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full rounded border p-2"
              />
            </div>
            <div className="flex-1">
              <label className="block font-medium">End Date</label>
              <input
                type="date"
                value={exp.endDate || ''}
                onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full rounded border p-2"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="block font-medium">Location</label>
            <input
              type="text"
              value={exp.location}
              onChange={(e) => updateExperience(index, 'location', e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full rounded border p-2"
            />
          </div>

          <ResponsibilitiesInput
            responsibilities={exp.responsibilities}
            onChange={(newResponsibilities) => {
              const updatedExperience = [...experience];
              updatedExperience[index].responsibilities = newResponsibilities;
              onChange(updatedExperience);
            }}
          />
        </div>
      ))}

      <button onClick={addExperience} className="mt-4 rounded bg-blue-500 px-4 py-2 text-white">
        <Plus size={16} className="mr-2 inline" /> Add Experience
      </button>
    </div>
  );
}

// Responsibilities Input Component
function ResponsibilitiesInput({
  responsibilities,
  onChange,
}: {
  responsibilities: string[];
  onChange: (responsibilities: string[]) => void;
}) {
  const [newResponsibility, setNewResponsibility] = useState('');

  const addResponsibility = () => {
    if (newResponsibility.trim() && !responsibilities.includes(newResponsibility.trim())) {
      onChange([...responsibilities, newResponsibility.trim()]);
      setNewResponsibility('');
    }
  };

  const removeResponsibility = (index: number) => {
    onChange(responsibilities.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addResponsibility();
    }
  };

  return (
    <div>
      <label className="mt-2 block font-medium">Responsibilities</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={newResponsibility}
          onChange={(e) => setNewResponsibility(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Add a responsibility"
          className="w-full rounded border p-2"
        />
        <button onClick={addResponsibility} className="rounded bg-gray-500 px-3 py-2 text-white">
          <Plus size={16} />
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {responsibilities.map((res, index) => (
          <span key={index} className="flex items-center gap-1 rounded bg-gray-200 px-3 py-1">
            {res}
            <button onClick={() => removeResponsibility(index)} className="text-red-500">
              <X size={12} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
