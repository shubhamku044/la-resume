'use client';

import { use, useState } from 'react';
import { resumes } from '@/data/resumes';
import { notFound } from 'next/navigation';
import ResumeForm from '@/components/templates/ResumeForm';
import ResumePreview from '@/components/templates/ResumePreview';

export default function ResumeTemplatePage({ params }: { params: Promise<{ template: string }> }) {
  const { template } = use(params); // ✅ Unwrap the params promise

  const templateData = resumes[template as keyof typeof resumes];

  const [imageUrl, setImageUrl] = useState<string | null>(null); // ✅ Hook at top level

  if (!templateData) return notFound(); // 🔥 This comes AFTER hooks

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {/* Left: Resume Form */}
      <ResumeForm onUpdate={setImageUrl} />

      {/* Right: Resume Preview */}
      <ResumePreview imageUrl={imageUrl} />
    </div>
  );
}
