'use client';
import { useResumeData } from '@/hooks/resumeData';
import { useIsMobile } from '@/hooks/use-mobile';
import ResumeForm from './_components/resumeForm';
import ResumePreview from './_components/resumepreview';
import { ResizablePanelGroup, ResizableHandle } from '@/components/ui/resizable';
import { deedyResumeData, deedy } from '@/lib/templates/deedy';

export default function ResumeTemplatePage() {
  const resumetype = 'deedy';
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
  } = useResumeData(resumetype);
  const isMobile = useIsMobile();

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

  return (
    <div className="flex justify-center p-4">
      <div className="container mx-auto px-4 sm:px-6">
        <ResizablePanelGroup
          direction={isMobile ? 'vertical' : 'horizontal'}
          className={isMobile ? 'flex flex-col gap-4' : 'grid grid-cols-2 gap-0'}
        >
          {isMobile ? (
            <>
              <ResumePreview
                imageUrl={imageUrl}
                latexData={latexData}
                loading={loading}
                resumeType={resumetype}
                paymentStatus={hasPaid}
                productId={productId}
                slug={slug as string}
              />
              <ResizableHandle className="h-4 w-full opacity-0" />
              <ResumeForm
                onUpdate={setImageUrl}
                setLoading={setLoading}
                setLatexData={setLatexData}
                templateSampleData={initialData as deedyResumeData}
                templateFunction={resumeFunc as typeof deedy}
                slug={slug as string}
                title={existingResume?.title || ''}
              />
            </>
          ) : (
            <>
              <ResumeForm
                onUpdate={setImageUrl}
                setLoading={setLoading}
                setLatexData={setLatexData}
                templateSampleData={initialData as deedyResumeData}
                templateFunction={resumeFunc as typeof deedy}
                slug={slug as string}
                title={existingResume?.title || ''}
              />
              <ResizableHandle className="w-4 opacity-0" />
              <ResumePreview
                imageUrl={imageUrl}
                latexData={latexData}
                loading={loading}
                resumeType={resumetype}
                slug={slug as string}
                paymentStatus={hasPaid}
                productId={productId}
              />
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
