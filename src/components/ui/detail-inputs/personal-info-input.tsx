import { useEffect, useState } from 'react';
import { PersonalInfo } from '@/types';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/store/hooks';
import {
  useGetUserDetailsQuery,
  useUpdateUserDetailsMutation,
} from '@/store/services/userDetailsApi';

interface PersonalInfoInputProps {
  onChange: (details: Partial<PersonalInfo>) => void;
  userId: string;
}

export default function PersonalInfoInput({ onChange, userId }: PersonalInfoInputProps) {
  console.log('userId', userId);
  const { data: personalInfo, isLoading } = useGetUserDetailsQuery(userId);
  console.log('Data from input', personalInfo);
  const [updatePersonalInfo] = useUpdateUserDetailsMutation();
  const [formState, setFormState] = useState<Partial<PersonalInfo>>({});

  // Sync form state when data loads
  useEffect(() => {
    if (personalInfo) {
      setFormState(personalInfo);
    }
  }, [personalInfo]);

  const handleChange = <K extends keyof PersonalInfo>(key: K, value: PersonalInfo[K]) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  if (isLoading) return <p>Loading...</p>;

  const handleSave = async () => {
    const updatedPersonalInfo = {
      clerk_id: userId,
      personalInfo: { ...formState },
    };
    console.log(updatedPersonalInfo);
    await updatePersonalInfo({
      clerk_id: userId,
      personalInfo: formState,
    });
  };

  const handleArrayChange = (key: keyof PersonalInfo, values: string[]) => {
    onChange({ ...personalInfo, [key]: values });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 text-lg font-semibold">Basic Information</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
            { label: 'Title', key: 'title', type: 'text', placeholder: 'Enter your job title' },
          ].map(({ label, key, type, placeholder }) => (
            <label key={key} className="block">
              <span className="text-sm font-medium">{label}</span>
              <input
                type={type}
                onChange={(e) => handleChange(key as keyof PersonalInfo, e.target.value)}
                className="w-full rounded border p-2"
                placeholder={placeholder}
              />
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">Professional Profiles</h3>
        {/*
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                value={(personalInfo[key as keyof PersonalInfo] as string) || ''}
                onChange={(e) => handleChange(key as keyof PersonalInfo, e.target.value)}
                className="w-full rounded border p-2"
                placeholder={placeholder}
              />
            </label>
          ))}
        </div>
        */}
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">Additional Details</h3>
        {/*
        <label className="block">
          <span className="text-sm font-medium">Summary</span>
          <textarea
            value={personalInfo.summary || ''}
            onChange={(e) => handleChange('summary', e.target.value)}
            className="w-full rounded border p-2"
            placeholder="Write a short summary about yourself"
            rows={3}
          />
        </label>
        */}

        {/*
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ArrayInput label="Languages" keyName="languages" />
          <ArrayInput label="Interests" keyName="interests" />
        </div>
        */}
      </div>

      <Button onClick={handleSave}>Save</Button>
    </div>
  );
}

/*
  const ArrayInput = ({ label, keyName }: { label: string; keyName: keyof PersonalInfo }) => {
    const [inputValue, setInputValue] = useState('');
    const values: string[] = (personalInfo[keyName] as string[]) ?? [];

    const addValue = () => {
      if (inputValue.trim() && !values.includes(inputValue.trim())) {
        handleArrayChange(keyName, [...values, inputValue.trim()]);
        setInputValue('');
      }
    };

    const removeValue = (index: number) => {
      const updatedValues = values.filter((_, i) => i !== index);
      handleArrayChange(keyName, updatedValues);
    };

    return (
      <div>
        <label className="block text-sm font-medium">{label}</label>
        <div className="mt-1 flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Enter ${label.toLowerCase()}`}
            className="w-full rounded border p-2"
            onKeyDown={(e) => e.key === 'Enter' && addValue()}
          />
          <Button onClick={addValue}>
            <Plus size={16} />
          </Button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {values.map((value, index) => (
            <span key={index} className="flex items-center gap-1 rounded bg-gray-200 px-3 py-1">
              {value}
              <button type="button" onClick={() => removeValue(index)} className="text-red-500">
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      </div>
    );
  };
*/