'use client';
import { deedyResumeData, resumesMap } from '@/lib/templates/index';
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import ResumeForm from './_components/resumeForm';
import ResumePreview from './_components/resumepreview';
import { ResizablePanelGroup, ResizableHandle } from '@/components/ui/resizable';
import { useGetResumeBySlugQuery } from '@/store/services/templateApi';
import { useUser } from '@clerk/nextjs';
import { useParams } from 'next/navigation';

export default function ResumeTemplatePage() {
  const templatePackage = resumesMap['deedy'];
  const { templateFunction: resumeFunc, templateSampleData: resumeSampleData } = templatePackage;

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [latexData, setLatexData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const isMobile = useIsMobile();

  const { user } = useUser();
  const clerkId = user?.id;
  const params = useParams();
  const { slug } = params;

  // Fetch existing resume data
  const {
    data: existingResume,
    isLoading: isFetching,
    isError,
  } = useGetResumeBySlugQuery(
    { clerk_id: clerkId!, slug: slug as string },
    { skip: !clerkId, refetchOnMountOrArgChange: true }
  );

  // Use existing resume data if available, otherwise use sample data
  const initialData = existingResume?.data
    ? (existingResume.data as deedyResumeData)
    : resumeSampleData;

  // If data is still being fetched, show a loading state

  if (isFetching) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  // If there's an error fetching the data, show an error state
  if (isError) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
        <div className="text-lg font-semibold">Error loading resume. Please try again.</div>
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
            // Mobile layout - Preview on top, Form below
            <>
              <ResumePreview imageUrl={imageUrl} latexData={latexData} loading={loading} />
              <ResizableHandle className="h-4 w-full opacity-0" />
              <ResumeForm
                onUpdate={setImageUrl}
                setLoading={setLoading}
                setLatexData={setLatexData}
                templateSampleData={initialData}
                templateFunction={resumeFunc}
                slug={slug as string}
                title={existingResume?.title || ''}
              />
            </>
          ) : (
            // Desktop layout - Form and Preview side by side
            <>
              <ResumeForm
                onUpdate={setImageUrl}
                setLoading={setLoading}
                setLatexData={setLatexData}
                templateSampleData={initialData}
                templateFunction={resumeFunc}
                slug={slug as string}
                title={existingResume?.title || ''}
              />
              <ResizableHandle className="w-4 opacity-0" />
              <ResumePreview imageUrl={imageUrl} latexData={latexData} loading={loading} />
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
