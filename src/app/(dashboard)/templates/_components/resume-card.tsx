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
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ShareModal } from '@/components/ui/share-modal';
import { getAssetUrl } from '@/lib/assets';
import { templates } from '@/lib/templates';
import { formatDistanceToNow } from 'date-fns';
import { Edit, MoreVertical, RotateCw, Share2, Sparkles, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface ResumeCardProps {
  id: string;
  title: string;
  slug: string;
  type: string;
  onDelete: () => void;
  isDeleting: boolean;
  lastUpdated: Date;
  imageUrl: string;
  paymentStatus: boolean;
  orderNumber: string;
  clerkId: string;
}

export function ResumeCard({
  id,
  title,
  slug,
  type,
  onDelete,
  isDeleting,
  lastUpdated,
  imageUrl,
  paymentStatus,
  clerkId,
}: ResumeCardProps) {
  const t = useTranslations();
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareId, setShareId] = useState<string | null>(null);
  const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null);
  const [showCreateShareAlert, setShowCreateShareAlert] = useState(false);
  const router = useRouter();

  const templateName = templates.find((tpl) => tpl.id === type)?.name ?? type;
  const isAutoTitle = /^Resume-[0-9a-f-]{12,}$/i.test(title.trim());
  const displayTitle = isAutoTitle ? 'Untitled resume' : title;

  const handleEditClick = () => {
    router.push(`/resume/template/${type}/${slug}`);
  };

  const checkSharedLink = async () => {
    if (!paymentStatus) return;
    try {
      const response = await fetch(`/api/sharing/by-resume?resumeId=${slug}`);
      const data = await response.json();
      if (data.success && data.data) {
        setShareId(data.data.shareId);
        setPdfDataUrl(imageUrl);
        setShowShareModal(true);
      } else {
        setShowCreateShareAlert(true);
      }
    } catch (error) {
      console.error('Error checking shared link:', error);
      toast.error('Failed to check shared status');
    }
  };

  return (
    <Card
      key={id}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant ${
        paymentStatus ? 'border-warning/50 ring-1 ring-warning/40' : ''
      }`}
    >
      {paymentStatus && (
        <div className="absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-warning px-2.5 py-1 text-xs font-semibold text-warning-foreground shadow-sm">
          <Sparkles className="size-3" />
          Premium
        </div>
      )}

      <CardContent className="p-0">
        <div
          className={`relative aspect-8.5/11 overflow-hidden bg-secondary ${
            paymentStatus ? 'bg-linear-to-b from-warning/10 to-secondary' : ''
          }`}
        >
          <div className="flex h-full w-full items-center justify-center p-3">
            <Image
              src={getAssetUrl(imageUrl)}
              alt={`Preview of ${displayTitle}`}
              width={400}
              height={500}
              className="h-full w-full rounded-lg object-contain shadow-sm transition-transform duration-500 group-hover:scale-[1.02]"
              unoptimized
            />
          </div>

          <div className="absolute right-3 top-3 z-10">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 bg-background/80 opacity-0 shadow-sm backdrop-blur-sm transition-opacity hover:bg-background group-hover:opacity-100"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/resume/template/${type}/${slug}`}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={checkSharedLink}>
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={onDelete}
                  className="text-destructive"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <RotateCw className="mr-2 h-4 w-4 animate-spin" /> Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="mr-2 h-4 w-4" /> {t('common.delete')}
                    </>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="absolute inset-0 flex items-end justify-center bg-linear-to-t from-black/60 via-black/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Button
              onClick={handleEditClick}
              size="sm"
              className="w-full cursor-pointer gap-1.5 shadow-lg"
            >
              <Edit className="size-4" /> Edit resume
            </Button>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex-1 items-start p-4">
        <div className="w-full">
          <h3 className="mb-0.5 truncate text-base font-semibold tracking-tight">{displayTitle}</h3>
          <p className="mb-2 truncate text-sm text-muted-foreground">{templateName}</p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Modified {formatDistanceToNow(lastUpdated, { addSuffix: true })}</span>
          </div>
        </div>
      </CardFooter>
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
