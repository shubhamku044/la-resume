import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useParams } from 'next/navigation';
import { useGetResumeBySlugQuery } from '@/store/services/templateApi';
import {
  deedyResumeData,
  resumesMap,
  Sb2novResumeData,
  MTeckResumeData,
} from '@/lib/templates/index';

export function useResumeData(templateKey: keyof typeof resumesMap) {
  const templatePackage = resumesMap[templateKey];
  const {
    templateFunction: resumeFunc,
    templateSampleData: resumeSampleData,
    productIdTest: productIdTest,
    productIdProd: productIdProd,
    productPrice: productPrice,
  } = templatePackage;

  const productId = process.env.NEXT_PUBLIC_ENV === 'production' ? productIdProd : productIdTest;

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [latexData, setLatexData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const clerkId = user?.id;
  const params = useParams();
  const { slug } = params;

  // Add safety checks and error handling for RTK Query
  const shouldSkip = !clerkId || !slug;

  const {
    data: existingResume,
    isLoading: isFetching,
    isError,
    error,
  } = useGetResumeBySlugQuery(
    {
      clerk_id: clerkId || '',
      slug: (slug as string) || '',
    },
    {
      skip: shouldSkip,
      refetchOnMountOrArgChange: true,
      // Add error handling options for Redux Toolkit 2.8.2 compatibility
      selectFromResult: ({ data, isLoading, isError, error }) => ({
        data,
        isLoading,
        isError,
        error,
      }),
    }
  );

  // Safe data access with fallback
  const initialData = existingResume?.data
    ? (existingResume.data as deedyResumeData | Sb2novResumeData | MTeckResumeData)
    : resumeSampleData;

  const hasPaid = existingResume?.hasPaid || false;

  return {
    resumeFunc,
    initialData,
    existingResume,
    isFetching,
    isError,
    error,
    imageUrl,
    latexData,
    loading,
    setImageUrl,
    setLatexData,
    setLoading,
    slug,
    resumeSampleData,
    hasPaid,
    productId,
    productPrice,
  };
}
