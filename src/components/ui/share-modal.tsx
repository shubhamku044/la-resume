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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Resume</DialogTitle>
          <DialogDescription>
            Create a shareable link for your resume that anyone can view without signing in.
          </DialogDescription>
        </DialogHeader>

        {!shareLink ? (
          <>
            <div className="flex flex-col space-y-4 py-4">
              <p className="text-sm text-muted-foreground">
                This will generate a public link to your resume that can be shared with anyone.
              </p>
              {error && (
                <div className="bg-red-50 text-red-800 p-3 rounded-md text-sm">{error}</div>
              )}
            </div>
            <DialogFooter className="sm:justify-start">
              <Button
                type="button"
                variant="default"
                onClick={handleCreateShareableLink}
                disabled={isSharing || !pdfDataUrl}
                className="w-full sm:w-auto"
              >
                {isSharing
                  ? 'Creating link...'
                  : existingShareId
                    ? 'Regenerate link'
                    : 'Create shareable link'}
                <Share2 className="ml-2 h-4 w-4" />
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <div className="flex flex-col space-y-4 py-4">
              <p className="text-sm text-muted-foreground">
                Your resume is now shared! Use this link to share with others:
              </p>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <LinkIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input className="pl-8" value={shareLink} readOnly />
                </div>
                <Button type="button" variant="outline" size="icon" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Note: This link will remain active as long as your resume exists.
              </p>
            </div>
            <DialogFooter className="sm:justify-start">
              <Button
                type="button"
                variant="outline"
                onClick={() => window.open(shareLink, '_blank')}
                className="w-full sm:w-auto"
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
