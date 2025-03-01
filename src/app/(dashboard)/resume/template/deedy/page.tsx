'use client';
import { resumes } from '@/lib/templates/index';
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile'; // Import your existing hook
import ResumeForm from './_components/resumeForm';
import ResumePreview from './_components/resumepreview';
import { ResizablePanelGroup, ResizableHandle } from '@/components/ui/resizable';

export default function ResumeTemplatePage() {
  const templatePackage = resumes['deedy'];
  const { templateFunction: resumeFunc, templateSampleData: resumeSampleData } = templatePackage;

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [latexData, setLatexData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const isMobile = useIsMobile(); // Use your existing hook

  return (
    <div className="flex justify-center p-4">
      <div className="container mx-auto px-4 sm:px-6">
        {' '}
        {/* Ensures central alignment and max width */}
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
                templateSampleData={resumeSampleData}
                templateFunction={resumeFunc}
              />
            </>
          ) : (
            // Desktop layout - Form and Preview side by side
            <>
              <ResumeForm
                onUpdate={setImageUrl}
                setLoading={setLoading}
                setLatexData={setLatexData}
                templateSampleData={resumeSampleData}
                templateFunction={resumeFunc}
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
