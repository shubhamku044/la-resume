import { useState, useEffect } from 'react';
import { MTeckResumeData } from '@/lib/templates/mteck';
import { useDebounce } from '@/hooks';

interface HeadingProps {
  data: MTeckResumeData['personalInfo'];
  setTempData: React.Dispatch<React.SetStateAction<MTeckResumeData>>;
  setIsChangesSaved?: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeadingSection = ({ data, setTempData, setIsChangesSaved }: HeadingProps) => {
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
        personalInfo: debouncedValues,
      }));
      if (setIsChangesSaved) setIsChangesSaved(false);
    }
  }, [debouncedValues, data, setTempData, setIsChangesSaved]);

  const handleChange = (field: keyof MTeckResumeData['personalInfo'], value: string) => {
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
              value={tempValues[field as keyof MTeckResumeData['personalInfo']] ?? ''}
              onChange={(e) =>
                handleChange(field as keyof MTeckResumeData['personalInfo'], e.target.value)
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
