import { Sb2novResumeData } from '@/lib/templates/sb2nov';

interface HeadingProps {
  data: Sb2novResumeData['heading'];
  setTempData: React.Dispatch<React.SetStateAction<Sb2novResumeData>>;
}

const HeadingSection = ({ data, setTempData }: HeadingProps) => {
  const handleChange = (section: keyof Sb2novResumeData, field: string, value: string) => {
    setTempData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };
  return (
    <div className="space-y-4">
      {Object.keys(data).map((field) => (
        <div key={field} className="flex flex-col">
          <label className="text-sm font-medium capitalize">{field}</label>
          <input
            type="text"
            value={data[field as keyof typeof data] || ''}
            onChange={(e) => handleChange('heading', field, e.target.value)}
            className="rounded-md border p-2"
          />
        </div>
      ))}
    </div>
  );
};

export default HeadingSection;
