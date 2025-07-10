import { useDebounce } from '@/hooks';
import { Sb2novResumeData } from '@/lib/templates/sb2nov';
import { Check, X } from 'lucide-react';
import { useEffect, useState } from 'react';
interface HeadingProps {
  data: Sb2novResumeData['heading'];
  setTempData: React.Dispatch<React.SetStateAction<Sb2novResumeData>>;
  setIsChangesSaved?: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeadingSection = ({ data, setTempData, setIsChangesSaved }: HeadingProps) => {
  const [tempValues, setTempValues] = useState(data);
  const [newSocialName, setNewSocialName] = useState('');
  const [newSocialUrl, setNewSocialUrl] = useState('');

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
      if (setIsChangesSaved) setIsChangesSaved(false);
    }
  }, [debouncedValues, data, setTempData, setIsChangesSaved]);

  const handleChange = (field: keyof Sb2novResumeData['heading'], value: string) => {
    setTempValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddSocial = () => {
    if (!newSocialName.trim() || !newSocialUrl.trim()) return;
    setTempValues((prev) => ({
      ...prev,
      socials: [...prev.socials, { name: newSocialName, url: newSocialUrl }],
    }));
    setNewSocialName('');
    setNewSocialUrl('');
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  const handleRemoveSocial = (index: number) => {
    setTempValues((prev) => ({
      ...prev,
      socials: prev.socials.filter((_, i) => i !== index),
    }));
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  const handleSocialChange = (index: number, field: 'name' | 'url', value: string) => {
    setTempValues((prev) => ({
      ...prev,
      socials: prev.socials.map((social, i) =>
        i === index ? { ...social, [field]: value } : social
      ),
    }));
  };

  return (
    <div className="space-y-4">
      {/* Name, Phone, Email, Location */}
      {(['name', 'phone', 'email', 'location'] as const).map((field) => (
        <div key={field} className="flex flex-col">
          <label className="text-sm font-semibold capitalize">{field}</label>
          <div className="relative flex items-center">
            <input
              type="text"
              value={tempValues[field] ?? ''}
              onChange={(e) => handleChange(field, e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:text-gray-200"
            />
          </div>
        </div>
      ))}

      {/* Social Links */}
      <div className="flex flex-col">
        <label className="text-sm font-semibold capitalize">Socials</label>
        <div className="space-y-2">
          {tempValues.socials?.map((social, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-2"
            >
              <input
                type="text"
                value={social.name}
                onChange={(e) => handleSocialChange(index, 'name', e.target.value)}
                placeholder="Social Name"
                className="w-full sm:w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:text-gray-200"
              />
              <input
                type="text"
                value={social.url}
                onChange={(e) => handleSocialChange(index, 'url', e.target.value)}
                placeholder="Social URL"
                className="w-full sm:w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:text-gray-200"
              />
              <button
                onClick={() => handleRemoveSocial(index)}
                className="self-end sm:self-auto text-red-500 hover:text-red-700"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <input
              type="text"
              value={newSocialName}
              onChange={(e) => setNewSocialName(e.target.value)}
              placeholder="New Social Name"
              className="w-full sm:flex-1 rounded-md border border-gray-300 p-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:text-gray-200"
            />
            <input
              type="text"
              value={newSocialUrl}
              onChange={(e) => setNewSocialUrl(e.target.value)}
              placeholder="New Social URL"
              className="w-full sm:flex-1 rounded-md border border-gray-300 p-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:text-gray-200"
            />
            <button
              onClick={handleAddSocial}
              className="self-end sm:self-auto text-green-500 hover:text-green-700"
            >
              <Check size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadingSection;
