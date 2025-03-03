'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetResumesQuery } from '@/store/services/templateApi';

interface Resume {
  id: string;
  title: string;
  type: string;
  slug: string;
}

export default function MadeByYouPage() {
  const { user } = useUser();
  const clerkId = user?.id;

  const {
    data: resumes = [],
    error,
    isLoading,
    refetch, // ✅ Get refetch function
  } = useGetResumesQuery({ clerk_id: clerkId ?? '' }, { skip: !clerkId });

  // ✅ Force refetch when component mounts
  useEffect(() => {
    if (clerkId) {
      refetch();
    }
  }, [clerkId, refetch]);

  if (!clerkId) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <p className="text-xl text-gray-600">Please log in to view your resumes.</p>
      </div>
    );
  }

  if (isLoading) {
    return <Skeleton className="h-20 w-full" />;
  }

  if (error) {
    return <div className="text-center text-red-500">Error loading resumes</div>;
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-4 text-2xl font-semibold">Resumes Made by You</h1>
      {resumes.length > 0 ? (
        <ul className="space-y-3">
          {resumes.map((resume: Resume) => (
            <li key={resume.id} className="rounded-lg bg-gray-100 p-4">
              <Link
                href={`/resume/template/${resume.type}/${resume.slug}`}
                className="text-blue-600 hover:underline"
              >
                {resume.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No resumes found.</p>
      )}
    </div>
  );
}
