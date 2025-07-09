'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { ResizablePanel } from '@/components/ui/resizable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useResumeData } from '@/hooks/resumeData';
import { MTeckResumeData } from '@/lib/templates/mteck';
import { useSaveResumeMutation, useUploadImageMutation } from '@/store/services/templateApi';
import { useUser } from '@clerk/nextjs';
import { Reorder } from 'framer-motion';
import { ChevronDown, GripVertical, PencilIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import CertificatesSection from './certificates';
import EducationSection from './education';
import ExperienceSection from './experience';
import HeadingSection from './heading';
import ProjectsSection from './projects';
import SkillsSection from './skills';

interface ResumeFormProps {
  onUpdate: (imageUrl: string | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setLatexData: (latexData: string | null) => void;
  templateSampleData: MTeckResumeData;
  templateFunction: (data: MTeckResumeData) => string;
  slug: string;
  title: string;
}

const ResumeForm = ({
  onUpdate,
  loading,
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
  const { resumeSampleData } = useResumeData('mteck');
  const [resumeSectionsOrder, setResumeSectionsOrder] = useState(
    formData?.sectionOrder || (resumeSampleData as MTeckResumeData).sectionOrder
  );
  const [isChangesSaved, setIsChangesSaved] = useState(false);
  const [isEditingFilename, setIsEditingFilename] = useState(false);
  const [isHoveringFilename, setIsHoveringFilename] = useState(false);
  const filenameInputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations();
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
      console.log('🖼️ Generated Resume Preview:', imageUrl);
      onUpdate(imageUrl);
    } catch (error) {
      console.error('Error generating resume preview:', error);
    } finally {
      setLoading(false);
    }
  }, [formData, onUpdate, setLatexData, setLoading, templateFunction]);

  useEffect(() => {
    setTempData((prev) => ({
      ...prev,
      sectionOrder: resumeSectionsOrder,
    }));
    setIsChangesSaved(false);
  }, [resumeSectionsOrder]);

  useEffect(() => {
    const timeout = setTimeout(() => setFormData(tempData), 500);
    return () => clearTimeout(timeout);
  }, [tempData]);

  useEffect(() => {
    if (Object.keys(formData).length > 0) generateResumePreview();
  }, [formData, generateResumePreview]);

  const sections = Object.keys(formData) as Array<keyof MTeckResumeData>;
  const sectionsOrder = formData?.sectionOrder || templateSampleData.sectionOrder;

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
      }
      if (!imageUrl) {
        toast.error('Error uploading image');
        setIsSaving(false);
        return;
      }
      await saveResume({
        clerk_id: clerkId,
        title: filename,
        type: 'mteck',
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
        <div className="flex items-center gap-2">
          <div className="relative">
            <Button
              disabled={isSaving || isChangesSaved || loading}
              className="relative"
              size="default"
              onClick={handleSave}
              variant={
                loading
                  ? 'destructive'
                  : isSaving
                    ? 'destructive'
                    : isChangesSaved
                      ? 'link'
                      : 'destructive'
              }
            >
              {isSaving ? (
                <>{t('common.saving')}</>
              ) : isChangesSaved ? (
                <>{t('common.saved')}</>
              ) : (
                <>{t('common.save')}</>
              )}
              {/* <span className="absolute -bottom-4 right-0 w-fit text-xs font-medium text-red-500">
                {!isChangesSaved && <>*{t('common.unsavedChanges')}</>}
              </span> */}
            </Button>
          </div>
          {resumeSectionsOrder && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="text-sm">
                <Button variant={'secondary'}>
                  <span>{t('common.reorderSection')}</span>
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="min-w-[200px]"
                forceMount
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                <DropdownMenuLabel>{t('common.reorderSection')}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Reorder.Group
                  axis="y"
                  values={resumeSectionsOrder}
                  onReorder={(values) => {
                    setResumeSectionsOrder(values);
                  }}
                >
                  {sectionsOrder?.map((section) => (
                    <Reorder.Item key={section} value={section}>
                      <DropdownMenuItem key={section}>
                        <div className="flex w-full items-center justify-between gap-4">
                          <p>{section}</p>
                          <GripVertical size={16} className="cursor-grab opacity-65" />
                        </div>
                      </DropdownMenuItem>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      <Tabs defaultValue={String(sections[0])} className="w-full">
        <div className="overflow-x-auto">
          <TabsList className="flex w-max gap-2">
            {sections
              .filter((section) => section !== 'sectionOrder')
              .map((section) => (
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
            {section === 'personalInfo' && (
              <HeadingSection
                setIsChangesSaved={setIsChangesSaved}
                data={tempData.personalInfo}
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
            {section === 'education' && (
              <EducationSection
                setIsChangesSaved={setIsChangesSaved}
                data={tempData.education}
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
            {section === 'certificates' && (
              <CertificatesSection
                setIsChangesSaved={setIsChangesSaved}
                data={tempData.certificates}
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
