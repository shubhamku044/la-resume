'use client';
import { useState, useEffect, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ArrayField from './ArrayField';
import NormalField from './NormalField';

interface IProps<T extends Record<string, unknown>> {
  setLatexData: React.Dispatch<React.SetStateAction<string | null>>;
  onUpdate: (imageUrl: string) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  templateSampleData: T;
  templateFunction: (data: T) => string;
}

const ResumeForm = <T extends Record<string, unknown>>({
  setLatexData,
  onUpdate,
  setLoading,
  templateSampleData,
  templateFunction,
}: IProps<T>) => {
  const [formData, setFormData] = useState<T>(templateSampleData);
  const [tempData, setTempData] = useState<T>(templateSampleData);

  const handleChange = (section: keyof T, index: number | null, field: string, value: string) => {
    setTempData((prev) => {
      const updatedData = { ...prev };
      const sectionValue = updatedData[section];

      if (index !== null && Array.isArray(sectionValue)) {
        const newArray = [...sectionValue] as Array<Record<string, string>>;
        newArray[index] = { ...newArray[index], [field]: value };
        return { ...updatedData, [section]: newArray as T[keyof T] };
      }

      if (typeof sectionValue === 'object' && sectionValue !== null) {
        return {
          ...updatedData,
          [section]: { ...sectionValue, [field]: value } as T[keyof T],
        };
      }

      return { ...updatedData, [section]: value as T[keyof T] };
    });
  };

  const generateResumePreview = useCallback(async () => {
    setLoading(true);
    try {
      const latexText = templateFunction(formData);
      setLatexData(latexText);

      const latexBlob = new Blob([latexText], { type: 'text/plain' });
      const formDataUpload = new FormData();
      formDataUpload.append('latex', latexBlob, 'resume.tex');

      const response = await fetch('/api/compile', {
        method: 'POST',
        body: formDataUpload,
      });

      if (!response.ok) throw new Error('Failed to generate resume preview');

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      onUpdate(imageUrl);
    } catch (error) {
      console.error('Error generating resume preview:', error);
    } finally {
      setLoading(false);
    }
  }, [formData, templateFunction, setLoading, onUpdate, setLatexData]);

  const handleAddEntry = (section: keyof T) => {
    setTempData((prev) => {
      const current = prev[section] as Array<Record<string, string>>;
      const emptyEntry =
        current.length > 0 ? Object.fromEntries(Object.keys(current[0]).map((k) => [k, ''])) : {};
      return { ...prev, [section]: [...current, emptyEntry] };
    });
  };

  const handleRemoveEntry = (section: keyof T, index: number) => {
    setTempData((prev) => ({
      ...prev,
      [section]: (prev[section] as Array<unknown>).filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    const timeout = setTimeout(() => setFormData(tempData), 500);
    return () => clearTimeout(timeout);
  }, [tempData]);

  useEffect(() => {
    if (Object.keys(formData).length > 0) generateResumePreview();
  }, [formData, generateResumePreview]);

  const sections = Object.keys(formData) as Array<keyof T>;

  return (
    <Tabs defaultValue={String(sections[0])} className="space-y-6 rounded-md border p-6">
      <TabsList className="flex flex-wrap gap-2">
        {sections.map((section) => (
          <TabsTrigger key={String(section)} value={String(section)} className="capitalize">
            {String(section)}
          </TabsTrigger>
        ))}
      </TabsList>

      {sections.map((section) => {
        const sectionData = tempData[section];
        const isArray = Array.isArray(sectionData);

        return (
          <TabsContent
            key={String(section)}
            value={String(section)}
            className="rounded-md border p-4"
          >
            {isArray ? (
              <ArrayField
                section={section}
                data={sectionData as Array<Record<string, string>>}
                handleChange={handleChange}
                handleAddEntry={handleAddEntry}
                handleRemoveEntry={handleRemoveEntry}
              />
            ) : (
              <NormalField
                section={section}
                data={sectionData as Record<string, string> | string}
                handleChange={handleChange}
              />
            )}
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default ResumeForm;
