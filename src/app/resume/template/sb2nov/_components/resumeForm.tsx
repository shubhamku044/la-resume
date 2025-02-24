'use client';

import { useState, useEffect, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResizablePanel } from '@/components/ui/resizable';
import { Sb2novResumeData } from '@/lib/templates/sb2nov';
import HeadingSection from './heading';
import EducationSection from './education';
import SkillsSection from './skills';
import ExperienceSection from './experience';
import ProjectsSection from './projects';
import HonorsAndRewards from './honorandawards';

interface ResumeFormProps {
  onUpdate: (imageUrl: string | null) => void;
  setLoading: (loading: boolean) => void;
  setLatexData: (latexData: string | null) => void;
  templateSampleData: Sb2novResumeData;
  templateFunction: (data: Sb2novResumeData) => string;
}

const ResumeForm = ({
  onUpdate,
  setLoading,
  setLatexData,
  templateSampleData,
  templateFunction,
}: ResumeFormProps) => {
  const [formData, setFormData] = useState(templateSampleData);
  const [tempData, setTempData] = useState(templateSampleData);

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
  }, [formData, onUpdate, setLatexData, setLoading, templateFunction]);

  useEffect(() => {
    const timeout = setTimeout(() => setFormData(tempData), 500);
    return () => clearTimeout(timeout);
  }, [tempData]);

  useEffect(() => {
    if (Object.keys(formData).length > 0) generateResumePreview();
  }, [formData, generateResumePreview]);

  const sections = Object.keys(formData) as Array<keyof Sb2novResumeData>;

  return (
    <ResizablePanel className="min-h-[500px] w-full min-w-[500px] rounded-md border p-4">
      <Tabs defaultValue={String(sections[0])} className="w-full">
        <TabsList className="flex flex-wrap gap-2">
          {sections.map((section) => (
            <TabsTrigger key={String(section)} value={String(section)} className="capitalize">
              {String(section)}
            </TabsTrigger>
          ))}
        </TabsList>

        {sections.map((section) => (
          <TabsContent
            key={String(section)}
            value={String(section)}
            className="rounded-md border p-4"
          >
            {section === 'heading' && (
              <HeadingSection data={tempData.heading} setTempData={setTempData} />
            )}

            {section === 'education' && (
              <EducationSection data={tempData.education} setTempData={setTempData} />
            )}

            {section === 'skills' && (
              <SkillsSection data={tempData.skills} setTempData={setTempData} />
            )}

            {section === 'experience' && (
              <ExperienceSection data={tempData.experience} setTempData={setTempData} />
            )}

            {section === 'projects' && (
              <ProjectsSection data={tempData.projects} setTempData={setTempData} />
            )}

            {section === 'honorsAndAwards' && (
              <HonorsAndRewards data={tempData.honorsAndAwards} setTempData={setTempData} />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </ResizablePanel>
  );
};

export default ResumeForm;
