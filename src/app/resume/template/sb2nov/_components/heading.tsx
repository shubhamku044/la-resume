import { useState } from 'react';
import { Pencil, Save } from 'lucide-react'; // Using Lucide Icons
import { Sb2novResumeData } from '@/lib/templates/sb2nov';

interface HeadingProps {
  data: Sb2novResumeData['heading'];
  setTempData: React.Dispatch<React.SetStateAction<Sb2novResumeData>>;
}

const HeadingSection = ({ data, setTempData }: HeadingProps) => {
  const [editField, setEditField] = useState<string | null>(null);
  const [tempValues, setTempValues] = useState(data);

  const handleChange = (field: keyof Sb2novResumeData['heading'], value: string) => {
    setTempValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = (field: keyof Sb2novResumeData['heading']) => {
    setTempData((prev) => ({
      ...prev,
      heading: {
        ...prev.heading,
        [field]: tempValues[field] ?? '', // Ensure value is never undefined
      },
    }));
    setEditField(null);
  };

  return (
    <div className="space-y-4">
      {Object.keys(data).map((field) => (
        <div key={field} className="flex flex-col">
          <label className="text-lg font-semibold capitalize">{field}</label>
          <div className="relative flex items-center">
            <input
              type="text"
              value={tempValues[field as keyof Sb2novResumeData['heading']] ?? ''} // Ensure a default value
              onChange={(e) =>
                handleChange(field as keyof Sb2novResumeData['heading'], e.target.value)
              }
              disabled={editField !== field}
              className={`w-full rounded-md border p-2 pr-10 transition ${
                editField !== field ? 'cursor-not-allowed bg-gray-100 text-gray-500' : ''
              }`}
            />
            {/* Edit/Save Icon */}
            <button
              onClick={() =>
                editField === field
                  ? handleSave(field as keyof Sb2novResumeData['heading'])
                  : setEditField(field)
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
