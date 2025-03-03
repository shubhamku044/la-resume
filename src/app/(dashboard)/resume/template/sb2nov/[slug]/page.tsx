'use client';
import { resumesMap } from '@/lib/templates/index';
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import ResumeForm from './_components/resumeForm';
import ResumePreview from './_components/resumepreview';
import { ResizablePanelGroup, ResizableHandle } from '@/components/ui/resizable';

export default function ResumeTemplatePage() {
  const templatePackage = resumesMap['sb2nov'];
  const { templateFunction: resumeFunc, templateSampleData: resumeSampleData } = templatePackage;

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [latexData, setLatexData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="flex justify-center p-4">
      <div className="container mx-auto">
        <ResizablePanelGroup
          direction={isMobile ? 'vertical' : 'horizontal'}
          className={isMobile ? 'flex flex-col gap-4' : 'grid grid-cols-2 gap-0'}
        >
          {isMobile ? (
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
