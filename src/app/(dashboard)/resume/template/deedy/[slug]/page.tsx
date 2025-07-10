'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ResizableHandle, ResizablePanelGroup } from '@/components/ui/resizable';
import { useResumeData } from '@/hooks/resumeData';
import { useIsMobile } from '@/hooks/use-mobile';
import { deedy, deedyResumeData } from '@/lib/templates/deedy';
import { Eye } from 'lucide-react';
import { useState } from 'react';
import ResumePreview from '../../_components/resumepreview';
import ResumeForm from './_components/resumeForm';

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
      <div className="min-h-screen ">
        {/* Mobile Header with Preview Button */}
        <div className=" bg-white px-2 ">
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
            loading={loading}
            setLoading={setLoading}
            setLatexData={setLatexData}
            templateSampleData={initialData as deedyResumeData}
            templateFunction={resumeFunc as typeof deedy}
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
            templateSampleData={initialData as deedyResumeData}
            templateFunction={resumeFunc as typeof deedy}
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
