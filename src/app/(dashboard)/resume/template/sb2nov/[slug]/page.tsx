'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ResizableHandle, ResizablePanelGroup } from '@/components/ui/resizable';
import { useResumeData } from '@/hooks/resumeData';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sb2novResumeData, sb2nov } from '@/lib/templates/sb2nov';
import { useSaveResumeMutation } from '@/store/services/templateApi';
import { useUser } from '@clerk/nextjs';
import { Eye, PencilIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import ResumePreview from '../../_components/resumepreview';
import ResumeForm from './_components/resumeForm';

interface MobileResumeTitleProps {
  title: string;
  slug: string;
}

function MobileResumeTitle({ title, slug }: MobileResumeTitleProps) {
  const [filename, setFilename] = useState(title);
  const [isEditingFilename, setIsEditingFilename] = useState(false);
  const [isHoveringFilename, setIsHoveringFilename] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const filenameInputRef = useRef<HTMLInputElement>(null);
  const [saveResume] = useSaveResumeMutation();
  const { user } = useUser();
  const clerkId = user?.id;

  useEffect(() => {
    if (isEditingFilename && filenameInputRef.current) {
      filenameInputRef.current.focus();
      filenameInputRef.current.select();
    }
  }, [isEditingFilename]);

  useEffect(() => {
    setFilename(title);
  }, [title]);

  const handleFilenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilename(e.target.value);
  };

  const handleSaveTitle = async () => {
    if (!filename.trim()) {
      toast.error('Filename cannot be empty');
      setFilename(title);
      setIsEditingFilename(false);
      return;
    }

    if (!clerkId) {
      toast.error('User ID is missing. Please try again.');
      return;
    }

    setIsSaving(true);
    try {
      await saveResume({
        clerk_id: clerkId,
        title: filename,
        type: 'sb2nov',
        data: {},
        slug,
        previewUrl: undefined,
      }).unwrap();

      toast.success('Resume title updated successfully!');
      setIsEditingFilename(false);
    } catch (error) {
      console.error('❌ Save Resume Title Error:', error);
      toast.error('Error updating resume title');
      setFilename(title);
    } finally {
      setIsSaving(false);
    }
  };

  const handleFilenameBlur = () => {
    if (filename !== title) {
      handleSaveTitle();
    } else {
      setIsEditingFilename(false);
    }
  };

  const handleFilenameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveTitle();
    } else if (e.key === 'Escape') {
      setFilename(title);
      setIsEditingFilename(false);
    }
  };

  return (
    <div className="group relative flex items-center gap-2 w-full">
      {isEditingFilename ? (
        <Input
          ref={filenameInputRef}
          type="text"
          value={filename}
          onChange={handleFilenameChange}
          onBlur={handleFilenameBlur}
          onKeyDown={handleFilenameKeyDown}
          className="text-lg font-semibold transition-all border-0 shadow-none p-0 h-auto focus-visible:ring-0 w-full"
          placeholder="Enter resume title"
          disabled={isSaving}
        />
      ) : (
        <div
          className="relative cursor-text w-full py-1 px-2 -mx-2 rounded-md touch-manipulation active:bg-gray-100"
          onClick={() => setIsEditingFilename(true)}
          onTouchStart={() => setIsHoveringFilename(true)}
          onTouchEnd={() => setIsHoveringFilename(false)}
          onMouseEnter={() => setIsHoveringFilename(true)}
          onMouseLeave={() => setIsHoveringFilename(false)}
        >
          <h1 className="text-lg font-semibold text-gray-900 truncate transition-all">
            {filename}
          </h1>
          <PencilIcon
            className={`absolute -right-1 top-1/2 size-4 -translate-y-1/2 transition-opacity text-gray-400 ${
              isHoveringFilename ? 'opacity-100' : 'opacity-60'
            }`}
          />
        </div>
      )}
    </div>
  );
}

export default function ResumeTemplatePage() {
  const resumeType = 'sb2nov';
  const {
    resumeFunc,
    initialData,
    existingResume,
    isFetching,
    isError,
    imageUrl,
    latexData,
    loading,
    setImageUrl,
    setLatexData,
    setLoading,
    slug,
    hasPaid,
    productId,
    productPrice,
  } = useResumeData(resumeType);
  const isMobile = useIsMobile();
  const [showPreviewOverlay, setShowPreviewOverlay] = useState(false);

  if (isFetching) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
        <div className="text-lg font-semibold">Error loading resume. Please try again.</div>
      </div>
    );
  }

  if (!existingResume) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
        <div className="text-lg font-semibold">Loading.</div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Header with Resume Name and Preview Button */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <MobileResumeTitle title={existingResume?.title || 'Resume'} slug={slug as string} />
            </div>
            <Button
              onClick={() => setShowPreviewOverlay(true)}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 ml-3"
            >
              <Eye size={16} />
              Preview
            </Button>
          </div>
        </div>

        {/* Mobile Resume Form */}
        <div className="px-4 py-4">
          <ResumeForm
            onUpdate={setImageUrl}
            loading={loading}
            setLoading={setLoading}
            setLatexData={setLatexData}
            templateSampleData={initialData as Sb2novResumeData}
            templateFunction={resumeFunc as typeof sb2nov}
            slug={slug as string}
            title={existingResume?.title || ''}
            isMobileView={true}
          />
        </div>

        {/* Preview Overlay */}
        <Dialog open={showPreviewOverlay} onOpenChange={setShowPreviewOverlay}>
          <DialogContent className="max-w-[95vw] w-[95vw] max-h-[95vh] h-[95vh] p-0 gap-0 flex flex-col">
            <DialogHeader className="px-4 py-3 border-b shrink-0">
              <DialogTitle className="text-lg font-semibold">Resume Preview</DialogTitle>
            </DialogHeader>
            <div className="flex-1 overflow-auto min-h-0">
              <ResumePreview
                imageUrl={imageUrl}
                latexData={latexData}
                loading={loading}
                paymentStatus={hasPaid}
                slug={slug as string}
                productId={productId}
                resumeType={resumeType}
                productPrice={productPrice}
                title={existingResume?.title || ''}
                isOverlay={true}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Desktop layout (unchanged)
  return (
    <div className="flex justify-center">
      <div className="container mx-auto">
        <ResizablePanelGroup direction="horizontal" className="grid grid-cols-2 gap-0">
          <ResumeForm
            onUpdate={setImageUrl}
            loading={loading}
            setLoading={setLoading}
            setLatexData={setLatexData}
            templateSampleData={initialData as Sb2novResumeData}
            templateFunction={resumeFunc as typeof sb2nov}
            slug={slug as string}
            title={existingResume?.title || ''}
            isMobileView={false}
          />
          <ResizableHandle className="w-4 opacity-0" />
          <ResumePreview
            imageUrl={imageUrl}
            latexData={latexData}
            loading={loading}
            paymentStatus={hasPaid}
            slug={slug as string}
            productId={productId}
            resumeType={resumeType}
            productPrice={productPrice}
            title={existingResume?.title || ''}
            isOverlay={false}
          />
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
