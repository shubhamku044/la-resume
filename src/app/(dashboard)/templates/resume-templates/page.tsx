'use client';
import { useRouter } from 'next/navigation';
import { templates } from '@/lib/templates';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUser } from '@clerk/nextjs';
import { useSaveResumeMutation } from '@/store/services/templateApi';
import { toast } from 'sonner';
import { v4 as uuid } from 'uuid';
import { useState } from 'react';

export default function ResumeTemplatesPage() {
  const router = useRouter();
  const { user } = useUser();
  const clerkId = user?.id;
  const [saveResume] = useSaveResumeMutation();
  const [iscreating, setIsCreating] = useState(false);
  const handleTemplateClick = async (templateId: string) => {
    setIsCreating(true);
    if (!clerkId) {
      toast.error('User ID is missing. Please try again.');
      return;
    }

    // Generate a new title and slug
    const newTitle = `Resume-${Date.now()}`;
    const newSlug = uuid();

    // Get the sample data for the selected template
    const template = templates.find((t) => t.id === templateId);
    if (!template) {
      toast.error('Template not found.');
      return;
    }
    const sampleData = template.sampleData;

    try {
      // Save the new resume
      const response = await saveResume({
        clerk_id: clerkId,
        title: newTitle,
        type: templateId,
        data: sampleData,
        slug: newSlug,
      }).unwrap();

      toast.success('Resume created successfully!');
      console.log('✅ Saved Resume:', response);

      // Navigate to the resume editor with the new slug
      router.push(`/resume/template/${templateId}/${newSlug}`);
    } catch (error) {
      console.error('❌ Save Resume Error:', error);
      toast.error('Error creating resume');
    }
    setIsCreating(false);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Blurred Background Overlay When Creating */}
      {iscreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-md">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-center text-lg font-semibold">Creating Resume...</h2>
          </div>
        </div>
      )}

      {/* Mobile Select Dropdown */}
      <div className="mb-6 sm:hidden">
        <Select
          defaultValue="/templates/resume-templates"
          onValueChange={(value) => router.push(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Page" defaultValue="/templates/resume-templates" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="/templates/resume-templates">Resume Templates</SelectItem>
            <SelectItem value="/templates/made-by-you">Resumes Made by You</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <h1 className="mb-4 text-center text-xl font-bold sm:text-2xl">Choose a Resume Template</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {templates.map((template) => (
          <div
            key={template.id}
            className="block cursor-pointer"
            onClick={() => handleTemplateClick(template.id)} // Handle click event
          >
            <div className="flex flex-col items-center rounded-lg border p-3 shadow-md transition hover:shadow-lg">
              <div
                className="w-full overflow-hidden rounded-lg bg-gray-100"
                style={{ aspectRatio: '210/297', width: '100%' }}
              >
                <Image
                  src={template.image}
                  alt={template.name} // Add alt text for accessibility
                  width={210}
                  height={297}
                  quality={100}
                  className="size-full object-cover"
                />
              </div>

              <h2 className="mt-2 text-center text-base font-semibold sm:text-lg">
                {template.name}
              </h2>
              <p className="text-center text-sm text-gray-600">{template.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
