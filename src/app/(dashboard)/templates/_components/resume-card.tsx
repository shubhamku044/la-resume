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
import { Card } from '@/components/ui/card';
import { ShareModal } from '@/components/ui/share-modal';
import {
  deedyResumeData,
  MTeckResumeData,
  resumesMap,
  Sb2novResumeData,
} from '@/lib/templates/index';
import { formatDistanceToNow } from 'date-fns';
import { CheckCircle, Edit, Lock, RotateCw, Share2, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

interface ResumeCardProps {
  id: string;
  title: string;
  slug: string;
  type: keyof typeof resumesMap;
  onDelete: () => void;
  isDeleting: boolean;
  lastUpdated: Date;
  data: Sb2novResumeData | deedyResumeData | MTeckResumeData;
  imageUrl: string;
  paymentStatus: boolean;
  orderNumber: string | '';
  clerkId: string;
}

export function ResumeCard({
  title,
  slug,
  type,
  onDelete,
  isDeleting,
  lastUpdated,
  imageUrl: imageLink,
  paymentStatus,
  orderNumber,
  clerkId,
}: ResumeCardProps) {
  const t = useTranslations();
  const [isHovered, setIsHovered] = useState(false);
  const [isIconHovered, setIsIconHovered] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareId, setShareId] = useState<string | null>(null);
  const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null);
  const [showCreateShareAlert, setShowCreateShareAlert] = useState(false);
  const [isCheckingShare, setIsCheckingShare] = useState(false);

  const checkSharedLink = async () => {
    if (!paymentStatus) {
      return;
    }

    try {
      setIsCheckingShare(true);
      const response = await fetch(`/api/sharing/by-resume?resumeId=${slug}`);
      const data = await response.json();

      if (data.success && data.data) {
        setShareId(data.data.shareId);
        setPdfDataUrl(imageLink);
        setShowShareModal(true);
      } else {
        setShowCreateShareAlert(true);
      }
    } catch (error) {
      console.error('Error checking shared link:', error);
      toast.error('Failed to check shared status');
    } finally {
      setIsCheckingShare(false);
    }
  };

  const handleShareClick = () => {
    if (!paymentStatus) {
      toast.error('Purchase required to share this resume');
      return;
    }

    checkSharedLink();
  };

  return (
    <Card
      className="group relative flex h-full -translate-y-1 flex-col overflow-hidden shadow-lg transition-all"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative size-full bg-white" style={{ aspectRatio: '1 / 1.414' }}>
        {imageLink ? (
          <Image
            src={imageLink}
            alt={`Preview of ${title}`}
            fill
            className="scale-105 object-contain p-4 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            unoptimized
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center bg-muted p-4">
            <div className="flex size-full items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30">
              <span className="text-center text-sm text-muted-foreground">
                Preview not available
              </span>
            </div>
          </div>
        )}

        {!isHovered && (
          <div className="absolute inset-0 flex flex-col justify-end p-4 text-lg font-semibold text-black">
            {title}
          </div>
        )}

        {paymentStatus && (
          <div
            className="absolute right-2 top-2 rounded-full bg-green-500 p-1.5 text-white shadow-md"
            onMouseEnter={() => setIsIconHovered(true)}
            onMouseLeave={() => setIsIconHovered(false)}
          >
            <CheckCircle className="size-5" />
          </div>
        )}

        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex flex-col gap-3 text-white">
            {paymentStatus && (
              <div
                className="absolute right-2 top-2 rounded-full bg-green-500 p-1.5 text-white shadow-md"
                onMouseEnter={() => setIsIconHovered(true)}
                onMouseLeave={() => setIsIconHovered(false)}
              >
                <CheckCircle className="size-5" />
                {isIconHovered && isHovered && (
                  <div className="absolute right-10 top-0 w-max whitespace-nowrap rounded bg-green-500 p-2 text-xs text-white shadow-lg">
                    Paid #{orderNumber}
                  </div>
                )}
              </div>
            )}
            <div className="space-y-1.5">
              <h3 className="text-lg font-semibold drop-shadow-md">{title}</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/80">
                  Updated {formatDistanceToNow(lastUpdated, { addSuffix: true })}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 gap-1.5"
                  onClick={handleShareClick}
                >
                  {isCheckingShare ? (
                    <>
                      <RotateCw className="size-4 animate-spin" />
                      Checking...
                    </>
                  ) : !paymentStatus ? (
                    <>
                      <Lock className="size-4" />
                      Share
                    </>
                  ) : (
                    <>
                      <Share2 className="size-4" />
                      Share
                    </>
                  )}
                </Button>
                {/* {imageLink && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20"
                    asChild
                  >
                    <Link href={imageLink} target="_blank">
                      View PDF
                    </Link>
                  </Button>
                )} */}
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20"
                  asChild
                >
                  <Link href={`/resume/template/${type}/${slug}`}>
                    <Edit className="size-4" />
                    Edit
                  </Link>
                </Button>
              </div>

              <Button
                variant="destructive"
                size="sm"
                onClick={onDelete}
                disabled={isDeleting}
                className="gap-1.5 backdrop-blur-sm"
              >
                {isDeleting ? (
                  <>
                    <RotateCw className="size-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="size-4" />
                    {t('common.delete')}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal for when sharing is possible */}
      <ShareModal
        open={showShareModal}
        onOpenChange={setShowShareModal}
        resumeId={slug}
        authorName=""
        pdfDataUrl={pdfDataUrl}
        existingShareId={shareId}
        onShareCreated={(newShareId) => setShareId(newShareId)}
        clerkId={clerkId}
        title={title}
      />

      <AlertDialog open={showCreateShareAlert} onOpenChange={setShowCreateShareAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create Shareable Link</AlertDialogTitle>
            <AlertDialogDescription>
              You need to create a shareable link from the resume editor. Would you like to go to
              the resume editor now?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Link href={`/resume/template/${type}/${slug}`}>Go to Editor</Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
