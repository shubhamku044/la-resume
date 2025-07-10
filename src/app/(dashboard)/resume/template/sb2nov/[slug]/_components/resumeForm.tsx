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
import { Sb2novResumeData } from '@/lib/templates/sb2nov';
import { useSaveResumeMutation, useUploadImageMutation } from '@/store/services/templateApi';
import { useUser } from '@clerk/nextjs';
import { Reorder } from 'framer-motion';
import { ChevronDown, GripVertical, PencilIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import EducationSection from './education';
import ExperienceSection from './experience';
import HeadingSection from './heading';
import HonorsAndRewards from './honorandawards';
import ProjectsSection from './projects';
import SkillsSection from './skills';

interface ResumeFormProps {
  onUpdate: (imageUrl: string | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setLatexData: (latexData: string | null) => void;
  templateSampleData: Sb2novResumeData;
  templateFunction: (data: Sb2novResumeData) => string;
  slug: string;
  title: string;
  isMobileView?: boolean;
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
  isMobileView = false,
}: ResumeFormProps) => {
  const [formData, setFormData] = useState(templateSampleData);
  const [tempData, setTempData] = useState(templateSampleData);
  const { resumeSampleData } = useResumeData('sb2nov');
  const [resumeSectionsOrder, setResumeSectionsOrder] = useState(
    formData?.sectionOrder || (resumeSampleData as Sb2novResumeData).sectionOrder
  );
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
  const t = useTranslations();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const tabsListRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (tabsListRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - tabsListRef.current.offsetLeft);
      setScrollLeft(tabsListRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    if (tabsListRef.current) {
      const x = e.pageX - tabsListRef.current.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed multiplier
      tabsListRef.current.scrollLeft = scrollLeft - walk;
    }
  };

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

  const sections = Object.keys(formData) as Array<keyof Sb2novResumeData>;
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

  const containerClass = isMobileView
    ? 'w-full bg-white'
    : 'min-h-[500px] w-full min-w-[500px] rounded-md border p-4';

  const Container = isMobileView ? 'div' : ResizablePanel;
  const containerProps = isMobileView
    ? { className: containerClass }
    : { className: containerClass };

  return (
    <Container {...containerProps}>
      {!isMobileView && (
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
      )}

      {/* Mobile Controls Section */}
      {isMobileView && (
        <div className="sticky top-[73px] z-20 bg-white border-b border-gray-200 px-4 py-3 mb-4">
          <div className="flex items-center justify-between gap-2 mb-3">
            <Button
              disabled={isSaving || isChangesSaved || loading}
              className="flex-1"
              size="default"
              onClick={handleSave}
              variant={
                loading
                  ? 'destructive'
                  : isSaving
                    ? 'destructive'
                    : isChangesSaved
                      ? 'default'
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
            </Button>
            {resumeSectionsOrder && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={'outline'} size="default" className="px-3">
                    <span className="text-sm">{t('common.reorderSection')}</span>
                    <ChevronDown size={16} />
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
      )}

      <Tabs defaultValue={String(sections[0])} className="w-full">
        <div
          ref={tabsListRef}
          className={`overflow-x-auto scrollbar-hide`}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <TabsList className="flex w-max gap-2">
            {sections
              .filter((section) => section !== 'sectionOrder')
              .map((section) => (
                <TabsTrigger
                  key={String(section)}
                  value={String(section)}
                  className={isMobileView ? 'capitalize text-xs py-2 px-1' : 'capitalize'}
                >
                  {String(section)}
                </TabsTrigger>
              ))}
          </TabsList>
        </div>

        {sections.map((section) => (
          <TabsContent
            key={String(section)}
            value={String(section)}
            className={isMobileView ? 'border-0 p-0 space-y-4' : 'rounded-md border p-4'}
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
    </Container>
  );
};

export default ResumeForm;
