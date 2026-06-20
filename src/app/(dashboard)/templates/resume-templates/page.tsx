'use client';
import { Sparkles } from 'lucide-react';
import { templates } from '@/lib/templates';
import { useSaveResumeMutation } from '@/store/services/templateApi';
import { useUser } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { v4 as uuid } from 'uuid';
import { TemplateCard } from '../_components/template-card';

export default function ResumeTemplatesPage() {
  const router = useRouter();
  const { user } = useUser();
  const clerkId = user?.id;
  const [saveResume] = useSaveResumeMutation();
  const [iscreating, setIsCreating] = useState(false);
  const t = useTranslations();

  const handleTemplateClick = async (templateId: string) => {
    setIsCreating(true);
    if (!clerkId) {
      toast.error('User ID is missing. Please try again.');
      setIsCreating(false);
      return;
    }

    // Generate a new title and slug
    const newTitle = `Resume-${uuid()}`;
    const newSlug = uuid();

    // Get the sample data for the selected template
    const template = templates.find((t) => t.id === templateId);
    if (!template) {
      toast.error('Template not found.');
      setIsCreating(false);
      return;
    }
    const sampleData = template.sampleData;
    const imageUrl = template.imageUrl;

    try {
      // Save the new resume
      await saveResume({
        clerk_id: clerkId,
        title: newTitle,
        type: templateId,
        data: sampleData,
        slug: newSlug,
        previewUrl: imageUrl,
      }).unwrap();

      toast.success('Resume created successfully!');

      // Navigate to the resume editor with the new slug
      await router.push(`/resume/template/${templateId}/${newSlug}`);
      setIsCreating(false);
    } catch (error) {
      console.error('❌ Save Resume Error:', error);
      toast.error('Error creating resume');
      setIsCreating(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      {iscreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-md">
          <div className="flex items-center gap-3 rounded-xl bg-card px-6 py-5 shadow-elegant">
            <span className="size-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <h2 className="text-lg font-semibold">Creating your resume…</h2>
          </div>
        </div>
      )}

      <div className="mx-auto mb-10 max-w-2xl space-y-4 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
          <Sparkles className="size-4" />
          {templates.length} professional templates
        </span>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            {t('templates.resTemplate')}
          </span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-muted-foreground">
          Pick a recruiter-approved, ATS-friendly design. Customize it in minutes and export to PDF
          or LaTeX.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template, index) => (
          <div
            key={template.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <TemplateCard
              title={template.name}
              description={template.description}
              isPremium
              imageUrl={template.imageUrl}
              rating={0}
              onUse={() => handleTemplateClick(template.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
