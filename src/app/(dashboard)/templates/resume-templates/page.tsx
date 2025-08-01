'use client';
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
    const newTitle = `Resume-${Date.now()}`;
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
      const response = await saveResume({
        clerk_id: clerkId,
        title: newTitle,
        type: templateId,
        data: sampleData,
        slug: newSlug,
        previewUrl: imageUrl,
      }).unwrap();

      toast.success('Resume created successfully!');
      console.log('✅ Saved Resume:', response);

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
    <div className="container space-y-4 mx-auto">
      {iscreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-md">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-center text-lg font-semibold">Creating Resume...</h2>
          </div>
        </div>
      )}

      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text">
          {t('templates.resTemplate')}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Select from our collection of professionally designed resume templates
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template, index) => (
          <div key={template.id} style={{ animationDelay: `${index * 100}ms` }}>
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
