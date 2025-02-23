'use client';
import { resumes } from '@/lib/templates/index';
import { use, useState } from 'react';
import ResumeForm from '@/components/templates/ResumeForm';
import ResumePreview from '@/components/templates/resume-preview';
import { ResizablePanelGroup, ResizableHandle } from '@/components/ui/resizable';

export default function ResumeTemplatePage({ params }: { params: Promise<{ template: string }> }) {
  const { template } = use(params);
  const templatePackage = resumes[template as keyof typeof resumes];
  const {
    templateType: resumeType,
    templateFunction: resumeFunc,
    templateSampleData: resumeSampleData,
  } = templatePackage;

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [latexData, setLatexData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <ResizablePanelGroup direction="horizontal" className="grid grid-cols-2 gap-0 p-4">
      <ResumeForm
        onUpdate={setImageUrl}
        setLoading={setLoading}
        setLatexData={setLatexData}
        templateType={resumeType}
        templateSampleData={resumeSampleData}
        templateFunction={resumeFunc}
      />
      <ResizableHandle className="w-4 opacity-0" />
      <ResumePreview imageUrl={imageUrl} latexData={latexData} loading={loading} />
    </ResizablePanelGroup>
  );
}
