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

interface IProps {
  imageUrl: string | null;
  latexData: string | null;
  loading: boolean;
}

const ResumePreview = ({ imageUrl, latexData, loading }: IProps) => {
  const [exportFormat, setExportFormat] = useState<string>('pdf');

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

  return (
    <ResizablePanel className="min-h-[500px] w-full min-w-[500px] rounded-md border p-4">
      <h2 className="text-lg font-semibold">Resume Preview</h2>
      {/* Export Controls */}
      <div className="mt-4 flex items-center justify-between">
        {/* Left Side: Loading Indicator (only shown when loading) */}
        <div className="h-10 flex-1">
          {loading && <CircularProgress className="scale-50 text-sm" strokeWidth={3} size="lg" />}
        </div>

        {/* Right Side: Export Options + Download Button */}
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
              Download
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
};

export default ResumePreview;
