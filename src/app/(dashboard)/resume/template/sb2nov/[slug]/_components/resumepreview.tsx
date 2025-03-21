'use client';

import { useState, useEffect } from 'react';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useUpdateUserPaymentStatusMutation } from '@/store/services/paymentApi';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { getCurrencyAndAmountByRegion } from '@/lib/utils';

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
  const [paid, setPaid] = useState<boolean>(paymentStatus);
  const [showPaymentAlert, setShowPaymentAlert] = useState<boolean>(false);
  const [updatePaymentStatus] = useUpdateUserPaymentStatusMutation();
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress; // User's email
  const fullName = user?.fullName;

  useEffect(() => {
    setPaid(paymentStatus);
  }, [paymentStatus]);

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
  };

  const handleExport = () => {
    if (exportFormat === 'pdf') {
      handleDownloadPDF();
    } else {
      handleDownloadLaTeX();
    }
  };

  const handlePayment = async () => {
    const detectUserRegion = async () => {
      try {
        const response = await axios.get('https://ipapi.co/json/');
        return response.data.country_code; // Returns country code (e.g., 'IN', 'US', 'GB')
      } catch (error) {
        console.error('Failed to detect user region:', error);
        return 'IN'; // Fallback to India
      }
    };

    const countryCode = await detectUserRegion();
    const { currency, amount } = getCurrencyAndAmountByRegion(countryCode);

    const orderResponse = await fetch('/api/razorpay', {
      method: 'POST',
      body: JSON.stringify({
        amount: amount, // ₹50 in paise
        receipt: 'receipt_order_74394',
      }),
    });
    const orderData = await orderResponse.json();

    // Step 2: Open Razorpay Checkout
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      amount: orderData.amount,
      currency: currency,
      name: 'LaResume',
      description: 'Pay ₹50 to Download Resume',
      order_id: orderData.id,
      handler: async (response: string) => {
        console.log('Payment successful:', response);

        try {
          await updatePaymentStatus({
            slug,
          }).unwrap();

          setPaid(true);
          setShowPaymentAlert(false); // Close the payment dialog
          toast.success('Payment successful! You can now download your resume.');
        } catch (error) {
          console.error('Failed to update payment status:', error);
          toast.error('Failed to update payment status. Please contact support.');
        }
      },
      prefill: {
        name: fullName,
        email: email,
        contact: '9999999999',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleDownloadClick = () => {
    if (!paid) {
      setShowPaymentAlert(true); // Show payment alert if not paid
    } else {
      setShowPaymentAlert(false); // Directly handle export if already paid
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
            <AlertDialog open={showPaymentAlert} onOpenChange={setShowPaymentAlert}>
              <AlertDialogTrigger
                className="rounded-md bg-black px-4 py-2 text-white"
                onClick={handleDownloadClick}
              >
                {t('common.download')}
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {paid ? 'Confirm Download' : 'Payment Required'}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {paid
                      ? `Are you sure you want to download the resume in ${exportFormat.toUpperCase()} format?`
                      : 'You need to pay ₹50 to download the resume. Do you want to proceed with the payment?'}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={paid ? handleExport : handlePayment}>
                    {paid ? 'Confirm' : 'Pay ₹50'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
      </ResizablePanel>
    );
  }
};

export default ResumePreview;
