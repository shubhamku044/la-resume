import { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface SkillsInputProps {
  skills: string[];
  onChange: (skills: string[]) => void;
}

export default function SkillsInput({ skills, onChange }: SkillsInputProps) {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      onChange([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    onChange(updatedSkills);
  };

  return (
    <div>
      <label className="block text-sm font-medium">Skills</label>
      <div className="mt-1 flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add a skill"
          className="w-full rounded border p-2"
          onKeyDown={(e) => e.key === 'Enter' && addSkill()}
        />
        <button onClick={addSkill} className="rounded bg-blue-500 px-3 py-2 text-white">
          <Plus size={16} />
        </button>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span key={index} className="flex items-center gap-1 rounded bg-gray-200 px-3 py-1">
            {skill}
            <button onClick={() => removeSkill(index)} className="text-red-500">
              <X size={12} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
