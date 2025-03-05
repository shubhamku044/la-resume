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
import { useUser } from '@clerk/nextjs';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetResumesQuery, useDeleteResumeMutation } from '@/store/services/templateApi';
import { Button } from '@/components/ui/button';
import { ResumeCard } from '../_components/resume-card';
import { deedyResumeData, resumesMap, Sb2novResumeData } from '@/lib/templates/index';

interface Resume {
  id: string;
  title: string;
  type: string;
  slug: string;
  data: object;
  updatedAt: Date;
  previewUrl: string;
}

export default function MadeByYouPage() {
  const { user } = useUser();
  const clerkId = user?.id;

  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    data: resumes = [],
    error,
    isLoading,
    refetch,
  } = useGetResumesQuery(
    { clerk_id: clerkId ?? '' },
    { skip: !clerkId, refetchOnMountOrArgChange: true, refetchOnFocus: true }
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
      setIsDeleting(true);
      await deleteResume({ clerk_id: clerkId, slug }).unwrap();
      refetch();
    } catch (error) {
      console.error('Failed to delete resume:', error);
    } finally {
      setIsDeleting(false);
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
        onConfirm={() => {
          if (selectedResume) {
            handleDelete(selectedResume.slug);
          }
        }}
        resumeTitle={selectedResume?.title || ''}
      />
      {resumes.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {resumes.map((resume) => (
            <div key={resume.id} className="aspect-[1/1.4] w-full">
              <ResumeCard
                key={resume.id}
                id={resume.id}
                title={resume.title}
                slug={resume.slug}
                type={resume.type as keyof typeof resumesMap}
                onDelete={() => setSelectedResume(resume)}
                isDeleting={isDeleting && selectedResume?.id === resume.id}
                lastUpdated={resume.updatedAt}
                data={resume.data as Sb2novResumeData | deedyResumeData}
                imageUrl={resume.previewUrl}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed bg-muted">
          <p className="text-muted-foreground">No resumes found. Start by creating one!</p>
        </div>
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
  onConfirm: () => void | Promise<void>;
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
