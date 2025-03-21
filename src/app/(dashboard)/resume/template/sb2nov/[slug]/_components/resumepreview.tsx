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

interface IProps {
  imageUrl: string | null;
  latexData: string | null;
  loading: boolean;
}

const ResumePreview = ({ imageUrl, latexData, loading }: IProps) => {
  const [exportFormat, setExportFormat] = useState<string>('pdf');
  const isMobile = useIsMobile();
  const t = useTranslations();

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
            <AlertDialog>
              <AlertDialogTrigger className="rounded-md bg-black px-4 py-2 text-white">
                {t('common.download')}
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Download</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to download the resume in{' '}
                    <strong>{exportFormat.toUpperCase()}</strong> format?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleExport}>Confirm</AlertDialogAction>
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
  } else {
    return (
      <div className="flex w-full justify-center">
        <ResizablePanel className="w-full max-w-[500px] rounded-md border p-4">
          <h2 className="text-center text-lg font-semibold">{t('common.resumePreview')}</h2>
          <div className="mt-4 flex w-full items-center justify-center gap-2">
            <Select onValueChange={(value) => setExportFormat(value)} defaultValue="pdf">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Export As" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="tex">LaTeX</SelectItem>
              </SelectContent>
            </Select>

            <AlertDialog>
              <AlertDialogTrigger className="rounded-md bg-black px-4 py-2 text-white">
                {t('common.download')}
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Download</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to download the resume in{' '}
                    <strong>{exportFormat.toUpperCase()}</strong> format?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleExport}>Confirm</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {/* Resume Preview with Loading */}
          <div className="relative mt-4 flex h-auto max-h-[calc(100vh-200px)] w-full items-center justify-center rounded-md border">
            {loading && (
              <div className="absolute z-50 flex items-center justify-center">
                <CircularProgress className="text-sm" strokeWidth={3} size="lg" />
              </div>
            )}
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Resume Preview"
                width={700}
                height={990}
                className="h-auto max-h-full w-full object-contain"
              />
            ) : (
              <p className="absolute inset-0 flex items-center justify-center text-sm text-gray-500">
                Preview will appear here...
              </p>
            )}
          </div>
        </ResizablePanel>
      </div>
    );
  }
};

export default ResumePreview;
