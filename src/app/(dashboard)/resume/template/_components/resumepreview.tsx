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
import { ResizablePanel } from '@/components/ui/resizable';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ShareModal } from '@/components/ui/share-modal';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCheckout } from '@/lib/checkoutDodo';
import { useUser } from '@clerk/nextjs';
import { Button } from '@heroui/button';
import { CircularProgress } from '@heroui/progress';
import { Download, Lock, Share2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
interface IProps {
  imageUrl: string | null;
  latexData: string | null;
  loading: boolean;
  paymentStatus: boolean;
  slug: string;
  productId: string;
  resumeType: string;
  productPrice: string;
  title: string;
  isOverlay?: boolean;
}
type Product = {
  product_id: string;
  name: string;
  redirectUrl: string;
  userId?: string;
  email?: string;
  fullName?: string;
  slug: string;
};
const ResumePreview = ({
  imageUrl,
  latexData,
  loading,
  paymentStatus,
  slug,
  productId,
  resumeType,
  productPrice,
  title,
  isOverlay = false,
}: IProps) => {
  const [exportFormat, setExportFormat] = useState<string>('pdf');
  const isMobile = useIsMobile();
  const t = useTranslations();
  const [showDownloadConfirmation, setShowDownloadConfirmation] = useState<boolean>(false);
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState<boolean>(false);
  const [showFreeDownload, setShowFreeDownload] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const { user } = useUser();
  const userId = user?.id;
  const email = user?.primaryEmailAddress?.emailAddress;
  const fullName = user?.fullName || '';
  const [paymentStarted, setPaymentStarted] = useState(false);
  const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null);
  const [shareId, setShareId] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);

  const { checkoutProduct } = useCheckout();
  const product: Product = {
    product_id: productId,
    name: slug,
    redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/resume/template/${resumeType}/${slug}/`,
    userId: userId,
    email: email,
    fullName: fullName,
    slug: slug,
  };

  // Function to generate PDF for sharing without downloading
  const generatePDFForSharing = async (): Promise<string | null> => {
    if (!latexData) return null;
    try {
      const latexBlob = new Blob([latexData], { type: 'text/plain' });
      const formData = new FormData();
      formData.append('latex', latexBlob, 'resume.tex');

      const response = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to generate PDF');

      const pdfBlob = await response.blob();

      // Convert blob to base64 data URL for sharing
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(pdfBlob);
        reader.onloadend = () => {
          const pdfDataUrl = reader.result as string;
          setPdfDataUrl(pdfDataUrl);
          resolve(pdfDataUrl);
        };
      });
    } catch (error) {
      console.error('Error generating PDF for sharing:', error);
      return null;
    }
  };

  const handleShare = async () => {
    try {
      setIsSharing(true);
      const response = await fetch(`/api/sharing/by-resume?resumeId=${slug}`);
      const data = await response.json();

      // Generate PDF for sharing if not already generated
      const pdfData = await generatePDFForSharing();
      if (!pdfData) {
        toast.error('Failed to generate PDF for sharing');
        return;
      }

      if (data.success && data.data) {
        // Update the existing shared resume with new PDF
        const updateResponse = await fetch('/api/sharing/update', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: title,
            shareId: data.data.shareId,
            pdfDataUrl: pdfData,
            resumeId: slug,
          }),
        });

        const updateResult = await updateResponse.json();
        if (updateResult.success) {
          setShareId(data.data.shareId);
          setShowShareModal(true);
        } else {
          toast.error('Failed to update shared resume');
        }
      } else {
        setShowShareModal(true);
      }
      setIsSharing(false);
    } catch (error) {
      console.error('Error handling share:', error);
      toast.error('Failed to share resume');
      setIsSharing(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!latexData) return;
    try {
      const latexBlob = new Blob([latexData], { type: 'text/plain' });
      const formData = new FormData();
      formData.append('latex', latexBlob, 'resume.tex');

      const response = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to generate PDF');

      const pdfBlob = await response.blob();
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Convert blob to base64 data URL for sharing
      const reader = new FileReader();
      reader.readAsDataURL(pdfBlob);
      reader.onloadend = () => {
        setPdfDataUrl(reader.result as string);
      };

      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `resume-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(pdfUrl);
      toast.success('PDF downloaded successfully');
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  const handleDownloadLaTeX = () => {
    if (!latexData) return;
    const latexBlob = new Blob([latexData], { type: 'text/plain' });
    const latexUrl = URL.createObjectURL(latexBlob);

    const link = document.createElement('a');
    link.href = latexUrl;
    link.download = `resume-${Date.now()}.tex`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(latexUrl);
    toast.success('LaTeX file downloaded successfully');
  };

  const handleExport = () => {
    if (exportFormat === 'pdf') {
      handleDownloadPDF();
    } else {
      handleDownloadLaTeX();
    }
  };

  const handlePayment = () => {
    if (!paymentStatus) {
      setPaymentStarted(true);
      // handlePayment();
      checkoutProduct(product, true);
    } else {
      setShowDownloadConfirmation(true);
    }
  };

  if (!isMobile || isOverlay) {
    const ContainerComponent = isOverlay ? 'div' : ResizablePanel;
    const containerProps = isOverlay
      ? { className: 'w-full p-4' }
      : { className: 'min-h-[500px] w-full min-w-[500px] rounded-md border p-4' };

    return (
      <ContainerComponent {...containerProps}>
        <h2 className="text-lg font-semibold">{t('common.resumePreview')}</h2>
        <div className={`mt-4 ${isOverlay ? 'space-y-3' : 'flex items-center justify-between'}`}>
          <div className={`${isOverlay ? 'order-2' : 'h-10 flex-1'}`}>
            {loading && (
              <div className="flex items-center gap-2">
                <span className="text-xs">Compiling</span>
                <CircularProgress className="scale-50 text-sm" strokeWidth={3} size="lg" />
              </div>
            )}
          </div>
          <div
            className={`${isOverlay ? 'flex flex-col gap-2 order-1' : 'flex items-center gap-4'}`}
          >
            {!isOverlay && (
              <Select onValueChange={(value) => setExportFormat(value)} defaultValue="pdf">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Export As" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="tex">LaTeX</SelectItem>
                </SelectContent>
              </Select>
            )}
            <div className={`${isOverlay ? 'flex gap-2' : 'flex gap-4'}`}>
              <Button
                className={`${
                  paymentStatus
                    ? 'bg-gradient-to-tr from-pink-500 to-yellow-500'
                    : 'bg-gray-400 dark:bg-gray-700'
                } text-white shadow-lg flex items-center gap-2 ${isOverlay ? 'flex-1 justify-center text-sm px-3 py-2' : ''}`}
                onPress={() => {
                  if (paymentStatus) {
                    if (isOverlay) {
                      handleDownloadPDF();
                    } else {
                      setShowDownloadConfirmation(true);
                    }
                  } else {
                    setShowPaymentConfirmation(true);
                  }
                }}
                disabled={paymentStarted}
              >
                {!paymentStatus && <Lock size={16} />}
                {paymentStarted ? (
                  <div className="flex items-center gap-2">
                    <CircularProgress
                      color="default"
                      className="scale-50 text-white"
                      strokeWidth={3}
                      size="sm"
                    />
                    <span className={isOverlay ? 'text-sm' : ''}>Processing...</span>
                  </div>
                ) : paymentStatus ? (
                  <>
                    <Download size={16} />
                    <span className={isOverlay ? 'text-sm' : ''}>{t('common.download')}</span>
                  </>
                ) : (
                  <span className={isOverlay ? 'text-sm' : ''}>Download</span>
                )}
              </Button>
              <Button
                className={`${
                  paymentStatus
                    ? 'bg-gradient-to-bl from-blue-300 to-blue-700 text-white shadow-lg'
                    : 'bg-gray-400 dark:bg-gray-700'
                } text-white shadow-lg flex items-center gap-2 ${isOverlay ? 'flex-1 justify-center text-sm px-3 py-2' : ''}`}
                disabled={isSharing}
                onPress={() => {
                  if (paymentStatus) {
                    handleShare();
                  } else {
                    setShowPaymentConfirmation(true);
                  }
                }}
              >
                {isSharing ? (
                  <div className="flex items-center gap-2">
                    <CircularProgress
                      color="default"
                      className="scale-50 text-white"
                      strokeWidth={3}
                      size="sm"
                    />
                    <span className={isOverlay ? 'text-sm' : ''}>Sharing...</span>
                  </div>
                ) : (
                  <>
                    <Share2 size={16} />
                    <span className={isOverlay ? 'text-sm' : ''}>Share</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="relative mt-2 flex aspect-[1/1.414] w-full items-center justify-center overflow-hidden rounded-md border">
          {imageUrl ? (
            <Image src={imageUrl} alt="Resume Preview" fill className="object-contain" />
          ) : (
            <p className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400">
              Preview will appear here...
            </p>
          )}
        </div>

        <AlertDialog open={showPaymentConfirmation} onOpenChange={setShowPaymentConfirmation}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('supportService.title')}</AlertDialogTitle>
              <AlertDialogDescription>{t('supportService.description')}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t('supportService.buttons.cancel')}</AlertDialogCancel>
              <AlertDialogAction onClick={handlePayment}>
                {t('supportService.buttons.pay', { price: productPrice })}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={showDownloadConfirmation} onOpenChange={setShowDownloadConfirmation}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('supportService.downloadConfirmation.title')}</AlertDialogTitle>
              <AlertDialogDescription>
                {t('supportService.downloadConfirmation.description', {
                  format: exportFormat.toUpperCase(),
                })}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t('supportService.buttons.cancel')}</AlertDialogCancel>
              <AlertDialogAction onClick={handleExport}>
                {t('supportService.buttons.confirm')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={showFreeDownload} onOpenChange={setShowFreeDownload}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('supportService.freeDownload.title')}</AlertDialogTitle>
              <AlertDialogDescription>
                {t('supportService.freeDownload.description')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t('supportService.buttons.cancel')}</AlertDialogCancel>
              <AlertDialogAction onClick={handleExport}>
                {t('supportService.buttons.confirm')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <ShareModal
          open={showShareModal}
          onOpenChange={setShowShareModal}
          resumeId={slug}
          authorName={fullName}
          pdfDataUrl={pdfDataUrl}
          existingShareId={shareId}
          onShareCreated={(newShareId) => setShareId(newShareId)}
          clerkId={userId || ''}
          title={title}
        />
      </ContainerComponent>
    );
  }

  // Mobile version (when not in overlay)
  return (
    <div className="w-full p-4">
      <h2 className="text-lg font-semibold">{t('common.resumePreview')}</h2>
      <div className="relative mt-4 flex aspect-[1/1.414] w-full items-center justify-center overflow-hidden rounded-md border">
        {imageUrl ? (
          <Image src={imageUrl} alt="Resume Preview" fill className="object-contain" />
        ) : (
          <p className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400">
            Preview will appear here...
          </p>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
