'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
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
import { useSaveResumeMutation, useUploadImageMutation } from '@/store/services/templateApi';
import { PencilIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CircularProgress } from '@heroui/progress';

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
  const [saveResume] = useSaveResumeMutation();
  const [uploadImage] = useUploadImageMutation();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isChangesSaved, setIsChangesSaved] = useState(false);
  const [isEditingFilename, setIsEditingFilename] = useState(false);
  const [isHoveringFilename, setIsHoveringFilename] = useState(false);
  const filenameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingFilename && filenameInputRef.current) {
      filenameInputRef.current.focus();
      filenameInputRef.current.select();
    }
  }, [isEditingFilename]);

  const handleFilenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilename(e.target.value);
  };

  const handleFilenameBlur = () => {
    if (!filename.trim()) {
      toast.error('Filename cannot be empty');
      setFilename(title);
    }
    setIsChangesSaved(false);
    setIsEditingFilename(false);
  };

  const handleFilenameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (!filename.trim()) {
        toast.error('Filename cannot be empty');
        setFilename(title);
      }
      setIsEditingFilename(false);
    }
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

      if (!response.ok)
        toast.error('Error generating resume preview', {
          style: {
            color: '#ff0034',
          },
        });

      const blob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);

      reader.onload = () => {
        const base64 = reader.result as string;
        setPreviewImage(base64);
        onUpdate(base64);
      };
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
    setIsSaving(true);
    if (!filename.trim()) {
      toast.error('Please enter a filename');
      setIsSaving(false);
      return;
    }

    if (!clerkId) {
      toast.error('User ID is missing. Please try again.');
      setIsSaving(false);
      return;
    }

    if (!formData || typeof formData !== 'object') {
      toast.error('Resume data is invalid.');
      setIsSaving(false);
      return;
    }

    try {
      let imageUrl = null;

      if (previewImage) {
        const { url } = await uploadImage({
          file: previewImage,
          fileName: slug,
        }).unwrap();
        imageUrl = url;
        console.log('🖼️ Uploaded Image URL:', imageUrl);
      }
      if (!imageUrl) {
        setIsSaving(false);
        toast.error('Error uploading image');
        return;
      }
      await saveResume({
        clerk_id: clerkId,
        title: filename,
        type: 'sb2nov',
        data: formData,
        slug,
        previewUrl: imageUrl,
      }).unwrap();

      toast.success('Resume saved successfully!');
      setIsSaving(false);
      setIsChangesSaved(true);
    } catch (error) {
      console.error('❌ Save Resume Error:', error);
      toast.error('Error saving resume');
      setIsSaving(false);
    }
  };

  const handleSaveCallback = useCallback(handleSave, [handleSave]);

  useEffect(() => {
    if (isChangesSaved) {
      // handleSaveCallback();
      // setIsChangesSaved(false);
    }
  }, [isChangesSaved, handleSaveCallback]);

  return (
    <ResizablePanel className="min-h-[500px] w-full min-w-[500px] rounded-md border p-4">
      <div className="mb-4 flex items-center justify-between">
        <div
          className="group relative flex items-center gap-2"
          onMouseEnter={() => setIsHoveringFilename(true)}
          onMouseLeave={() => setIsHoveringFilename(false)}
        >
          {isEditingFilename ? (
            <Input
              ref={filenameInputRef}
              type="text"
              value={filename}
              onChange={handleFilenameChange}
              onBlur={handleFilenameBlur}
              onKeyDown={handleFilenameKeyDown}
              className="text-lg font-semibold transition-all"
              placeholder="Enter resume title"
            />
          ) : (
            <div className="relative cursor-text" onClick={() => setIsEditingFilename(true)}>
              <h1 className="text-base font-semibold transition-all group-hover:opacity-80">
                {filename}
              </h1>
              <PencilIcon
                className={`absolute -right-6 top-1/2 size-4 -translate-y-1/2 transition-opacity ${
                  isHoveringFilename ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col items-end">
          <Button
            disabled={isSaving || isChangesSaved}
            className="disabled:cursor-not-allowed"
            size="sm"
            onClick={handleSave}
          >
            {isSaving ? (
              <CircularProgress className="scale-50 text-sm" strokeWidth={3} size="lg" />
            ) : (
              <>Save</>
            )}
          </Button>
          <span className="text-xs font-medium text-red-500">
            {!isChangesSaved && <>*Unsaved changes</>}
          </span>
        </div>
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
              <HeadingSection
                data={tempData.heading}
                setIsChangesSaved={setIsChangesSaved}
                setTempData={setTempData}
              />
            )}

            {section === 'education' && (
              <EducationSection
                setIsChangesSaved={setIsChangesSaved}
                data={tempData.education}
                setTempData={setTempData}
              />
            )}

            {section === 'skills' && (
              <SkillsSection
                setIsChangesSaved={setIsChangesSaved}
                data={tempData.skills}
                setTempData={setTempData}
              />
            )}

            {section === 'experience' && (
              <ExperienceSection
                setIsChangesSaved={setIsChangesSaved}
                data={tempData.experience}
                setTempData={setTempData}
              />
            )}

            {section === 'projects' && (
              <ProjectsSection
                setIsChangesSaved={setIsChangesSaved}
                data={tempData.projects}
                setTempData={setTempData}
              />
            )}

            {section === 'honorsAndAwards' && (
              <HonorsAndRewards
                setIsChangesSaved={setIsChangesSaved}
                data={tempData.honorsAndAwards}
                setTempData={setTempData}
              />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </ResizablePanel>
  );
};

export default ResumeForm;
