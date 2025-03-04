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
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import { useSaveResumeMutation } from '@/store/services/templateApi';
import { PencilIcon, CheckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
interface ResumeFormProps {
  onUpdate: (imageUrl: string | null) => void;
  setLoading: (loading: boolean) => void;
  setLatexData: (latexData: string | null) => void;
  templateSampleData: Sb2novResumeData;
  templateFunction: (data: Sb2novResumeData) => string;
  slug: string;
  title: string;
}

const ResumeForm = ({
  onUpdate,
  setLoading,
  setLatexData,
  templateSampleData,
  templateFunction,
  slug,
  title,
}: ResumeFormProps) => {
  const [formData, setFormData] = useState(templateSampleData);
  const [tempData, setTempData] = useState(templateSampleData);
  const { user } = useUser();
  const clerkId = user?.id;
  const [filename, setFilename] = useState(title);
  const [editingFilename, setEditingFilename] = useState(false);
  const [saveResume] = useSaveResumeMutation();
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

  const handleSave = async () => {
    if (!filename.trim()) {
      toast.error('Please enter a filename');
      return;
    }

    if (!clerkId) {
      toast.error('User ID is missing. Please try again.');
      return;
    }

    if (!formData || typeof formData !== 'object') {
      toast.error('Resume data is invalid.');
      return;
    }
    console.log('📄 Saving Resume:', filename, formData);

    try {
      const response = await saveResume({
        clerk_id: clerkId,
        title: filename,
        type: 'deedy',
        data: formData,
        slug,
      }).unwrap();

      toast.success('Resume saved successfully!');
      console.log('✅ Saved Resume:', response);
    } catch (error) {
      console.error('❌ Save Resume Error:', error);
      toast.error('Error saving resume');
    }
  };

  return (
    <ResizablePanel className="min-h-[500px] w-full min-w-[500px] rounded-md border p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {editingFilename ? (
            <Input
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              className="text-xl font-semibold"
              placeholder="Enter resume title"
            />
          ) : (
            <div>
              <h1 className="text-xl font-semibold">{filename}</h1>
            </div>
          )}

          <Button variant="outline" onClick={() => setEditingFilename((prev) => !prev)}>
            {editingFilename ? <CheckIcon /> : <PencilIcon />}
          </Button>
        </div>

        <Button
          onClick={handleSave}
          className="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors"
        >
          Save
        </Button>
      </div>

      <Tabs defaultValue={String(sections[0])} className="w-full">
        <div className="overflow-x-auto">
          <TabsList className="flex w-max gap-2">
            {sections.map((section) => (
              <TabsTrigger key={String(section)} value={String(section)} className="capitalize">
                {String(section)}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

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
