import { useState, useRef } from 'react';
import { Pencil, Save } from 'lucide-react'; // Using Lucide Icons
import { MTeckResumeData } from '@/lib/templates/mteck';

interface PersonalInfo {
  name: string;
  phone: string;
  email: string;
  github: string;
  linkedin: string;
  summary: string;
}

interface HeadingProps {
  data: PersonalInfo;
  setTempData: React.Dispatch<React.SetStateAction<MTeckResumeData>>;
}

const HeadingSection = ({ data, setTempData }: HeadingProps) => {
  const [editField, setEditField] = useState<string | null>(null);
  const [tempValues, setTempValues] = useState(data);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    setTempValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = (field: keyof PersonalInfo) => {
    setTempData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: tempValues[field] ?? '', // Ensure value is never undefined
      },
    }));
    setEditField(null);
  };

  const handleBlur = (field: keyof PersonalInfo) => {
    if (editField === field) {
      setTempData((prev) => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          [field]: tempValues[field] ?? '', // Save value on blur
        },
      }));
      setEditField(null);
    }
  };

  return (
    <div className="space-y-4">
      {Object.keys(data).map((field) => (
        <div key={field} className="flex flex-col">
          <label className="text-lg font-semibold capitalize">{field}</label>
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={tempValues[field as keyof PersonalInfo] ?? ''} // Ensure a default value
              onChange={(e) => handleChange(field as keyof PersonalInfo, e.target.value)}
              onBlur={() => handleBlur(field as keyof PersonalInfo)}
              disabled={editField !== field}
              className={`w-full rounded-md border p-2 pr-10 transition ${
                editField !== field ? 'cursor-not-allowed bg-gray-100 text-gray-500' : ''
              }`}
            />
            {/* Edit/Save Icon */}
            <button
              onClick={() =>
                editField === field ? handleSave(field as keyof PersonalInfo) : setEditField(field)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-gray-200 p-1 transition hover:bg-gray-300"
            >
              {editField === field ? <Save size={18} /> : <Pencil size={18} />}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeadingSection;
