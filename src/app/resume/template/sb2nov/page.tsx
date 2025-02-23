'use client';
import { resumes } from '@/lib/templates/index';
import { useState } from 'react';
import ResumeForm from './_components/resumeForm';
import ResumePreview from './_components/resumepreview';
import { ResizablePanelGroup, ResizableHandle } from '@/components/ui/resizable';

export default function ResumeTemplatePage() {
  const templatePackage = resumes['sb2nov']; // Change 'modern' to the default template you want to use
  const { templateFunction: resumeFunc, templateSampleData: resumeSampleData } = templatePackage;

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [latexData, setLatexData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <ResizablePanelGroup direction="horizontal" className="grid grid-cols-2 gap-0 p-4">
      <ResumeForm
        onUpdate={setImageUrl}
        setLoading={setLoading}
        setLatexData={setLatexData}
        templateSampleData={resumeSampleData}
        templateFunction={resumeFunc}
      />
      <ResizableHandle className="w-4 opacity-0" />
      <ResumePreview imageUrl={imageUrl} latexData={latexData} loading={loading} />
    </ResizablePanelGroup>
  );
}
