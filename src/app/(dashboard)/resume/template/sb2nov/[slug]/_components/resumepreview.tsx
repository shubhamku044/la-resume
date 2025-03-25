'use client';

import { useState } from 'react';
import { CircularProgress } from '@heroui/progress';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ResizablePanel } from '@/components/ui/resizable';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
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
import { useUser } from '@clerk/nextjs';
import { Button } from '@heroui/button';
import { Crown } from 'lucide-react';

interface IProps {
  imageUrl: string | null;
  latexData: string | null;
  loading: boolean;
  paymentStatus: boolean;
  slug: string;
}

const ResumePreview = ({ imageUrl, latexData, loading, paymentStatus, slug }: IProps) => {
  const [exportFormat, setExportFormat] = useState<string>('pdf');
  const isMobile = useIsMobile();
  const t = useTranslations();
  const [showDownloadConfirmation, setShowDownloadConfirmation] = useState<boolean>(false);
  const [message, setMessage] = useState('');
  const { user } = useUser();
  const userId = user?.id;
  const email = user?.primaryEmailAddress?.emailAddress;
  const fullName = user?.fullName;
  const [paymentStarted, setPaymentStarted] = useState(false);

  const handlePayment = async () => {
    try {
      const res = await fetch('/api/lemon/purchaseProduct', {
        method: 'POST',
        body: JSON.stringify({
          productId: '737782',
          redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/resume/template/sb2nov/${slug}/`,
          userDetails: {
            userId,
            email,
            fullName,
            slug,
          },
        }),
      });
      const data = await res.json();
      window.location.href = data.checkoutUrl;
      setPaymentStarted(false);
    } catch (error) {
      console.error('LemonSqueezy Error:', error);
      setMessage('Failed to create LemonSqueezy order');
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

  const handleDownloadClick = () => {
    if (!paymentStatus) {
      setPaymentStarted(true);
      handlePayment();
    } else {
      setShowDownloadConfirmation(true);
    }
  };

  if (!isMobile) {
    return (
      <ResizablePanel className="min-h-[500px] w-full min-w-[500px] rounded-md border p-4">
        <h2 className="text-lg font-semibold">{t('common.resumePreview')}</h2>
        <div className="mt-4 flex items-center justify-between">
          <div className="h-10 flex-1">
            {loading && (
              <div className="flex items-center gap-2">
                <span className="text-xs">Compiling</span>
                <CircularProgress className="scale-50 text-sm" strokeWidth={3} size="lg" />
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Select onValueChange={(value) => setExportFormat(value)} defaultValue="pdf">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Export As" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="tex">LaTeX</SelectItem>
              </SelectContent>
            </Select>
            <Button
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
              onPress={handleDownloadClick}
              disabled={paymentStarted}
            >
              {paymentStarted ? (
                <div className="flex items-center gap-2">
                  <CircularProgress
                    color="default"
                    className="scale-50 text-white"
                    strokeWidth={3}
                    size="sm"
                  />
                  <span>Processing...</span>
                </div>
              ) : paymentStatus ? (
                <>
                  {t('common.download')}
                  <Crown size={16} />
                </>
              ) : (
                'Pay & Download'
              )}
            </Button>
          </div>
        </div>

        <div className="relative mt-2 flex aspect-[1/1.414] w-full items-center justify-center overflow-hidden rounded-md border">
          {imageUrl ? (
            <Image src={imageUrl} alt="Resume Preview" fill className="object-contain" />
          ) : (
            <p className="absolute inset-0 flex items-center justify-center text-gray-500">
              Preview will appear here...
            </p>
          )}
        </div>

        <AlertDialog open={showDownloadConfirmation} onOpenChange={setShowDownloadConfirmation}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Download</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to download the resume in {exportFormat.toUpperCase()} format?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleExport}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {message && <p className="mt-4 text-red-500">{message}</p>}
      </ResizablePanel>
    );
  }
};

export default ResumePreview;
