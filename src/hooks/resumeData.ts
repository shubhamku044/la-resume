import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useParams } from 'next/navigation';
import { useGetResumeBySlugQuery } from '@/store/services/templateApi';
import { deedyResumeData, resumesMap, Sb2novResumeData } from '@/lib/templates/index';

export function useResumeData(templateKey: keyof typeof resumesMap) {
  const templatePackage = resumesMap[templateKey];
  const { templateFunction: resumeFunc, templateSampleData: resumeSampleData } = templatePackage;

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [latexData, setLatexData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
    ? (existingResume.data as deedyResumeData | Sb2novResumeData)
    : resumeSampleData;

  return {
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
  };
}
