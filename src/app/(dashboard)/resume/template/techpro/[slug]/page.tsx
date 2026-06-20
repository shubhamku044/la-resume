'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ResizableHandle, ResizablePanelGroup } from '@/components/ui/resizable';
import { useResumeData } from '@/hooks/resumeData';
import { useIsMobile } from '@/hooks/use-mobile';
import { techPro, TechProResumeData } from '@/lib/templates/techpro';
import { Eye } from 'lucide-react';
import { useState } from 'react';
import ResumePreview from '../../_components/resumepreview';
import ResumeForm from './_components/resumeForm';

export default function ResumeTemplatePage() {
  const resumeType = 'techpro';
  const {
    resumeFunc,
    initialData,
    existingResume,
    isFetching,
    isError,
    imageUrl,
    previewPages,
    latexData,
    loading,
    setImageUrl,
    setPreviewPages,
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
      <div className="flex h-[calc(100dvh-4rem)] w-full items-center justify-center bg-background">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[calc(100dvh-4rem)] w-full items-center justify-center bg-background">
        <div className="text-lg font-semibold">Error loading resume. Please try again.</div>
      </div>
    );
  }

  if (!existingResume) {
    return (
      <div className="flex h-[calc(100dvh-4rem)] w-full items-center justify-center bg-background">
        <div className="text-lg font-semibold">Loading.</div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="min-h-screen ">
        <div className=" bg-background px-2 ">
          <div className="flex items-center justify-center">
            <Button
              onClick={() => setShowPreviewOverlay(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Eye size={16} />
              Preview
            </Button>
          </div>
        </div>

        {/* Mobile Resume Form */}
        <div className="px-2">
          <ResumeForm
            onUpdate={setImageUrl}
            onPreviewPagesUpdate={setPreviewPages}
            loading={loading}
            setLoading={setLoading}
            setLatexData={setLatexData}
            templateSampleData={initialData as TechProResumeData}
            templateFunction={resumeFunc as typeof techPro}
            slug={slug as string}
            title={existingResume?.title || ''}
            isMobileView={true}
          />
        </div>

        <Dialog open={showPreviewOverlay} onOpenChange={setShowPreviewOverlay}>
          <DialogContent className="max-w-[95vw] w-[95vw] max-h-[95vh] h-[95vh] p-0 gap-0 flex flex-col">
            <DialogHeader className="px-4 py-3 border-b shrink-0">
              <DialogTitle className="text-lg font-semibold">Resume Preview</DialogTitle>
            </DialogHeader>
            <div className="flex-1 overflow-auto min-h-0">
              <ResumePreview
                imageUrl={imageUrl}
                previewPages={previewPages}
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

  return (
    <div className="h-[calc(100dvh-4rem)] w-full overflow-hidden">
      <div className="h-full w-full">
        <ResizablePanelGroup orientation="horizontal" className="h-full w-full">
          <ResumeForm
            onUpdate={setImageUrl}
            onPreviewPagesUpdate={setPreviewPages}
            loading={loading}
            setLoading={setLoading}
            setLatexData={setLatexData}
            templateSampleData={initialData as TechProResumeData}
            templateFunction={resumeFunc as typeof techPro}
            slug={slug as string}
            title={existingResume?.title || ''}
            isMobileView={false}
          />
          <ResizableHandle withHandle />
          <ResumePreview
            imageUrl={imageUrl}
            previewPages={previewPages}
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
