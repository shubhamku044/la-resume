'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetResumesQuery, useDeleteResumeMutation } from '@/store/services/templateApi';
import { Button } from '@/components/ui/button';

interface Resume {
  id: string;
  title: string;
  type: string;
  slug: string;
}

export default function MadeByYouPage() {
  const { user } = useUser();
  const clerkId = user?.id;
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);

  const {
    data: resumes = [],
    error,
    isLoading,
    refetch,
  } = useGetResumesQuery(
    { clerk_id: clerkId ?? '' },
    { skip: !clerkId, refetchOnMountOrArgChange: true }
  );

  const [deleteResume] = useDeleteResumeMutation();

  useEffect(() => {
    if (clerkId) {
      refetch();
    }
  }, [clerkId, refetch]);

  const handleDelete = async (slug: string) => {
    if (!clerkId) {
      console.error('User is not logged in.');
      return;
    }

    try {
      await deleteResume({ clerk_id: clerkId, slug }).unwrap();
      refetch();
    } catch (error) {
      console.error('Failed to delete resume:', error);
    }
  };

  if (isLoading) {
    return <Skeleton className="h-20 w-full" />;
  }

  if (error) {
    return <div className="text-center text-red-500">Error loading resumes</div>;
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-4 text-2xl font-semibold">Resumes Made by You</h1>
      <DeleteConfirmationDialog
        open={!!selectedResume}
        onOpenChange={(open) => !open && setSelectedResume(null)}
        onConfirm={() => handleDelete}
        resumeTitle={selectedResume?.title || ''}
      />
      {resumes.length > 0 ? (
        <ul className="space-y-3">
          {resumes.map((resume: Resume) => (
            <li
              key={resume.id}
              className="flex items-center justify-between rounded-lg bg-gray-100 p-4"
            >
              <Link
                href={`/resume/template/${resume.type}/${resume.slug}`}
                className="text-blue-600 hover:underline"
              >
                {resume.title}
              </Link>
              <Button variant="destructive" onClick={() => setSelectedResume(resume)}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No resumes found.</p>
      )}
    </div>
  );
}

const DeleteConfirmationDialog = ({
  open,
  onOpenChange,
  onConfirm,
  resumeTitle,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  resumeTitle: string;
}) => (
  <AlertDialog open={open} onOpenChange={onOpenChange}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete <strong>&apos;{resumeTitle}&apos;</strong>? This action
          cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction asChild>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
