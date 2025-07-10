'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Copy, Link as LinkIcon, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resumeId: string;
  authorName: string;
  pdfDataUrl: string | null;
  existingShareId?: string | null;
  onShareCreated?: (shareId: string) => void;
  clerkId: string;
  title: string;
}

export const ShareModal = ({
  open,
  onOpenChange,
  resumeId,
  authorName,
  pdfDataUrl,
  existingShareId = null,
  onShareCreated,
  clerkId,
  title,
}: ShareModalProps) => {
  const [isSharing, setIsSharing] = useState(false);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If we have an existing shareId, set the link immediately
    if (open && existingShareId) {
      setShareLink(`${window.location.origin}/shared/${existingShareId}`);
    }
  }, [open, existingShareId]);

  const handleCreateShareableLink = async () => {
    if (!pdfDataUrl) {
      setError('Resume PDF is not available. Please regenerate the preview first.');
      return;
    }

    try {
      setIsSharing(true);
      setError(null);

      const response = await fetch('/api/sharing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          resumeId,
          pdfDataUrl,
          authorName,
          clerkId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create shareable link');
      }

      const shareableUrl = `${window.location.origin}/shared/${data.sharedResume.shareId}`;
      setShareLink(shareableUrl);

      // Notify parent component about the new share ID
      if (onShareCreated) {
        onShareCreated(data.sharedResume.shareId);
      }
    } catch (err) {
      console.error('Error sharing resume:', err);
      setError(err instanceof Error ? err.message : 'Failed to create shareable link');
    } finally {
      setIsSharing(false);
    }
  };

  const copyToClipboard = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      toast.success('Link copied to clipboard');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="mx-3 w-[calc(100vw-1.5rem)] max-w-[90vw] sm:mx-auto sm:w-full sm:max-w-md">
        <DialogHeader className="text-left">
          <DialogTitle className="text-lg font-semibold">Share Resume</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-1">
            Create a shareable link for your resume that anyone can view without signing in.
          </DialogDescription>
        </DialogHeader>

        {!shareLink ? (
          <>
            <div className="flex flex-col space-y-4 py-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                This will generate a public link to your resume that can be shared with anyone.
              </p>
              {error && (
                <div className="bg-red-50 text-red-800 p-3 rounded-md text-sm border border-red-200">
                  {error}
                </div>
              )}
            </div>
            <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-start">
              <Button
                type="button"
                variant="default"
                onClick={handleCreateShareableLink}
                disabled={isSharing || !pdfDataUrl}
                className="w-full sm:w-auto flex items-center justify-center gap-2"
              >
                {isSharing
                  ? 'Creating link...'
                  : existingShareId
                    ? 'Regenerate link'
                    : 'Create shareable link'}
                <Share2 className="h-4 w-4" />
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <div className="flex flex-col space-y-4 py-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your resume is now shared! Use this link to share with others:
              </p>
              <div className="space-y-3">
                {/* Mobile: Stacked layout */}
                <div className="block sm:hidden space-y-2">
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input className="pl-10 pr-3 text-sm" value={shareLink} readOnly />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={copyToClipboard}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copy Link
                  </Button>
                </div>

                {/* Desktop: Side by side layout */}
                <div className="hidden sm:flex items-center gap-2">
                  <div className="relative flex-1">
                    <LinkIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input className="pl-8" value={shareLink} readOnly />
                  </div>
                  <Button type="button" variant="outline" size="icon" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Note: This link will remain active as long as your resume exists.
              </p>
            </div>
            <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-start">
              <Button
                type="button"
                variant="outline"
                onClick={() => window.open(shareLink, '_blank')}
                className="w-full sm:w-auto flex items-center justify-center gap-2"
              >
                Open shared page
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
