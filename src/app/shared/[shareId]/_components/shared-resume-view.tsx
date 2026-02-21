'use client';

import { Header } from '@/components/landing/header';
import { useIsMobile } from '@/hooks/use-mobile';
import { format } from 'date-fns';
import { Calendar, Download, Eye, Maximize } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { incrementViewCount } from '../_actions/increment-view';

interface SharedResumeData {
  shareId: string;
  pdfUrl: string;
  authorName: string;
  lastUpdated: string | Date;
  createdAt: string | Date;
  viewCount: number;
  resumeTitle: string;
  userId: string;
}

interface Props {
  data: SharedResumeData;
  isOwner: boolean;
}

function ViewTracker({ shareId }: { shareId: string }) {
  useEffect(() => {
    const viewedResumes = JSON.parse(localStorage.getItem('viewedResumes') || '[]');
    if (!viewedResumes.includes(shareId)) {
      incrementViewCount(shareId);
      localStorage.setItem('viewedResumes', JSON.stringify([...viewedResumes, shareId]));
    }
  }, [shareId]);

  return null;
}

export default function SharedResumeView({ data, isOwner }: Props) {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen">
      <ViewTracker shareId={data.shareId} />
      <Header />
      <div className="py-2 sm:py-4 px-2 sm:px-4 bg-gray-50 relative">
        {isMobile && (
          <div className="fixed bottom-6 right-6 z-50">
            <Link
              href={data.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 w-12 flex items-center justify-center bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            >
              <Maximize size={20} />
            </Link>
          </div>
        )}

        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="p-3 sm:p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 sm:gap-3">
                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-gray-800">
                    {data.resumeTitle || 'Untitled Resume'}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1 text-gray-600 text-xs sm:text-sm">
                    <div className="flex items-center">
                      <span className="font-medium mr-1">Author:</span>
                      <span>{data.authorName}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={isMobile ? 12 : 14} className="mr-1" />
                      <span>{format(new Date(data.lastUpdated), 'MMM dd, yyyy')}</span>
                    </div>
                    {isOwner && (
                      <div className="flex items-center">
                        <Eye size={isMobile ? 12 : 14} className="mr-1" />
                        <span>
                          {data.viewCount} view{data.viewCount === 1 ? '' : 's'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-2 sm:p-4 bg-gray-100">
              <div className="flex justify-between items-center mb-3">
                {!isMobile && (
                  <div className="text-sm text-gray-600">
                    Use controls to zoom in/out or fit to width
                  </div>
                )}
                {isMobile && (
                  <div className="text-sm text-gray-600">
                    For best viewing experience, download the PDF
                  </div>
                )}
              </div>

              <div className="bg-white rounded-lg border border-gray-300 overflow-hidden shadow-sm max-w-6xl mx-auto touch-manipulation">
                {isMobile && (
                  <div className="p-4 w-full flex items-center justify-center bg-gray-50 border-b border-gray-200">
                    <Link
                      href={data.pdfUrl}
                      download
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <Download size={isMobile ? 16 : 18} />
                      <span>Download PDF</span>
                    </Link>
                  </div>
                )}
                <div className="relative h-[70vh] sm:h-[100vh]">
                  <object
                    data={`${data.pdfUrl}#view='Fit'`}
                    type="application/pdf"
                    className="absolute top-0 left-0 w-full h-full"
                    aria-label="Shared Resume PDF"
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gray-50">
                      <p className="mb-4 text-gray-600">Unable to display PDF preview.</p>
                      <Link
                        href={data.pdfUrl}
                        download
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <Download size={16} />
                        <span>Download PDF</span>
                      </Link>
                    </div>
                  </object>
                </div>
              </div>
            </div>

            <div className="p-3 sm:p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs sm:text-sm text-gray-600">
                  Shared using{' '}
                  <Link href="/" className="font-medium text-blue-600 hover:underline">
                    LaResume
                  </Link>
                </p>

                {!isMobile && (
                  <Link
                    href={data.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Maximize size={16} />
                    <span>Open in new tab</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
