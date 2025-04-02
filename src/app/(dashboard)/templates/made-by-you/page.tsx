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
import {
  useGetResumesQuery,
  useDeleteResumeMutation,
  useDeleteImageKitFileMutation,
} from '@/store/services/templateApi';
import { Button } from '@/components/ui/button';
import { ResumeCard } from '../_components/resume-card';
import {
  deedyResumeData,
  resumesMap,
  Sb2novResumeData,
  MTeckResumeData,
} from '@/lib/templates/index';
import { templates } from '@/lib/templates';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

interface Resume {
  id: string;
  title: string;
  type: string;
  slug: string;
  data: object;
  updatedAt: Date;
  previewUrl: string;
  hasPaid: boolean;
  orderNumber: string | '';
}

export default function MadeByYouPage() {
  const { isLoaded, user } = useUser();
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
  const [deleteImageKitFile] = useDeleteImageKitFileMutation();
  const t = useTranslations();

  useEffect(() => {
    if (clerkId) {
      refetch();
    }
  }, [clerkId, refetch]);

  const handleDelete = async (resume: Resume) => {
    if (!clerkId) {
      return;
    }

    try {
      setIsDeleting(true);
      const isTemplateImage = templates.some((template) => resume.previewUrl === template.imageUrl);

      if (!isTemplateImage) {
        await deleteImageKitFile({ slug: resume.slug }).unwrap();
      }
      await deleteResume({ clerk_id: clerkId, slug: resume.slug }).unwrap();
      toast.success('Resume deleted successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to delete resume... Try again later');
      console.error('Failed to delete resume:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!clerkId) {
    return null;
  }

  if (!isLoaded) {
    return <Skeleton className="h-20 w-full" />;
  }

  if (isLoading) {
    return <Skeleton className="h-20 w-full" />;
  }

  if (error) {
    return <div className="text-center text-red-500">Error loading resumes</div>;
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-4 text-2xl font-semibold">{t('templates.madeByYou')}</h1>
      <DeleteConfirmationDialog
        open={!!selectedResume}
        onOpenChange={(open) => !open && setSelectedResume(null)}
        onConfirm={() => {
          if (selectedResume) {
            handleDelete(selectedResume);
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
                data={resume.data as Sb2novResumeData | deedyResumeData | MTeckResumeData}
                imageUrl={resume.previewUrl}
                paymentStatus={resume.hasPaid}
                orderNumber={resume.orderNumber}
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
}) => {
  const t = useTranslations();
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('deleteModal.title')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t.rich('deleteModal.message', {
              name: () => <strong>&apos;{resumeTitle}&apos;</strong>,
            })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {t('common.cancel')}
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" className="bg-red-700" onClick={onConfirm}>
              {t('common.delete')}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
