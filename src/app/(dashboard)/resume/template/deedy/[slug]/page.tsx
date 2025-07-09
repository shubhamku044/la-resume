'use client';
import { ResizableHandle, ResizablePanelGroup } from '@/components/ui/resizable';
import { useResumeData } from '@/hooks/resumeData';
import { useIsMobile } from '@/hooks/use-mobile';
import { deedy, deedyResumeData } from '@/lib/templates/deedy';
import ResumeForm from './_components/resumeForm';
import ResumePreview from './_components/resumepreview';

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
    productPrice,
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
    <div className="flex justify-center">
      <div className="container mx-auto">
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
                productPrice={productPrice}
              />
              <ResizableHandle className="h-4 w-full opacity-0" />
              <ResumeForm
                onUpdate={setImageUrl}
                loading={loading}
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
                loading={loading}
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
                productPrice={productPrice}
              />
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
