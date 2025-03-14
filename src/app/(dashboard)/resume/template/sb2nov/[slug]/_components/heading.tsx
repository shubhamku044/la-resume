import { useState, useEffect } from 'react';
import { Sb2novResumeData } from '@/lib/templates/sb2nov';
import { useDebounce } from '@/hooks';

interface HeadingProps {
  data: Sb2novResumeData['heading'];
  setTempData: React.Dispatch<React.SetStateAction<Sb2novResumeData>>;
}

const HeadingSection = ({ data, setTempData }: HeadingProps) => {
  const [tempValues, setTempValues] = useState(data);

  const debouncedValues = useDebounce(tempValues, 1000);

  useEffect(() => {
    const hasChanges = Object.keys(debouncedValues).some(
      (key) =>
        debouncedValues[key as keyof typeof debouncedValues] !== data[key as keyof typeof data]
    );

    if (hasChanges) {
      setTempData((prev) => ({
        ...prev,
        heading: debouncedValues,
      }));
    }
  }, [debouncedValues, data, setTempData]);

  const handleChange = (field: keyof Sb2novResumeData['heading'], value: string) => {
    setTempValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-4">
      {Object.keys(data).map((field) => (
        <div key={field} className="flex flex-col">
          <label className="text-sm font-semibold capitalize">{field}</label>
          <div className="relative flex items-center">
            <input
              type="text"
              value={tempValues[field as keyof Sb2novResumeData['heading']] ?? ''}
              onChange={(e) =>
                handleChange(field as keyof Sb2novResumeData['heading'], e.target.value)
              }
              className={`w-full rounded-md border p-2 pr-10 text-sm transition`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeadingSection;
