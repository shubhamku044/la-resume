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
    <div className="mx-auto p-6">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumes.length > 0 &&
          resumes.map((resume) => (
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
      {resumes.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No resumes yet</h3>
          <p className="text-muted-foreground mb-4">Create your first resume to get started</p>
          <Button variant="hero">
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Resume
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
