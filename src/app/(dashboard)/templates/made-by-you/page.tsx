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
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { templates } from '@/lib/templates';
import { resumesMap } from '@/lib/templates/index';
import {
  useDeleteImageFileMutation,
  useDeleteResumeMutation,
  useGetResumesQuery,
} from '@/store/services/templateApi';
import { useUser } from '@clerk/nextjs';
import { FileText, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ResumeCard } from '../_components/resume-card';

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
  const [deleteImageFile] = useDeleteImageFileMutation();
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
        await deleteImageFile({ slug: resume.slug, hasPaid: resume.hasPaid }).unwrap();
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

  if (!isLoaded || isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Skeleton className="mb-2 h-9 w-64" />
        <Skeleton className="mb-8 h-5 w-80" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="aspect-8.5/11 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <p className="text-destructive">Something went wrong loading your resumes.</p>
        <Button variant="outline" className="mt-4" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
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

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {t('templates.madeByYou')}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {resumes.length > 0
              ? `${resumes.length} ${resumes.length === 1 ? 'resume' : 'resumes'} — edit, preview, share or download.`
              : 'Your saved resumes will appear here.'}
          </p>
        </div>
        {resumes.length > 0 && (
          <Button asChild className="shrink-0 gap-2">
            <Link href="/templates/resume-templates">
              <Plus className="size-4" />
              New resume
            </Link>
          </Button>
        )}
      </div>

      {resumes.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resumes.map((resume) => (
            <ResumeCard
              key={resume.id}
              id={resume.id}
              title={resume.title}
              slug={resume.slug}
              type={resume.type as keyof typeof resumesMap}
              onDelete={() => setSelectedResume(resume)}
              isDeleting={isDeleting && selectedResume?.id === resume.id}
              lastUpdated={resume.updatedAt}
              imageUrl={resume.previewUrl}
              paymentStatus={resume.hasPaid}
              orderNumber={resume.orderNumber}
              clerkId={clerkId}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-secondary/40 px-6 py-20 text-center">
          <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-gradient-primary text-white shadow-glow">
            <FileText className="size-8" />
          </div>
          <h3 className="text-xl font-semibold">No resumes yet</h3>
          <p className="mb-6 mt-2 max-w-sm text-muted-foreground">
            Choose a professionally designed template to build your first ATS-friendly resume.
          </p>
          <Button asChild size="lg" className="gap-2">
            <Link href="/templates/resume-templates">
              <Plus className="size-4" />
              Create your first resume
            </Link>
          </Button>
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
