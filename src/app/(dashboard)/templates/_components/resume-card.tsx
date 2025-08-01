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
import { Badge } from '@/components/ui/badge';
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
import { formatDistanceToNow } from 'date-fns';
import { Edit, Eye, MoreVertical, RotateCw, Share2, Trash2 } from 'lucide-react';
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

  const handleEditClick = () => {
    router.push(`/resume/template/${type}/${slug}`);
  };

  const handlePreviewClick = () => {
    router.push(`/resume/preview/${slug}`);
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
      className="group transition-transform duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02] rounded-2xl border"
    >
      <CardContent className="p-0">
        <div className="aspect-[8.5/11] bg-white rounded-t-2xl relative overflow-hidden">
          <div className="w-full h-full flex items-center justify-center p-2">
            <Image
              src={imageUrl}
              alt={`Preview of ${title}`}
              width={400}
              height={500}
              className="object-contain rounded-xl w-full h-full"
              unoptimized
            />
          </div>

          {paymentStatus && (
            <Badge className="absolute top-3 left-3" variant="default">
              Paid
            </Badge>
          )}

          <div className="absolute top-3 right-3 z-10">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
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
                <DropdownMenuItem onClick={handlePreviewClick}>
                  <Eye className="mr-2 h-4 w-4" /> Preview
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

          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="space-x-2">
              {/* <Button onClick={handlePreviewClick} size="sm" variant="outline">
                <Eye className="w-4 h-4 mr-1" /> Preview
              </Button> */}
              <Button onClick={handleEditClick} size="sm" variant="default">
                <Edit className="w-4 h-4 mr-1" /> Edit
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4">
        <div className="w-full">
          <h3 className="font-semibold text-base mb-1 truncate">{title}</h3>
          <p className="text-sm text-muted-foreground mb-2 truncate">{type}</p>
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
