'use client';

import { Header } from '@/components/landing/header';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@clerk/nextjs';
import { format } from 'date-fns';
import { Calendar, Download, Eye, Maximize } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface SharedResumeData {
  shareId: string;
  pdfUrl: string;
  authorName: string;
  lastUpdated: string;
  createdAt: string;
  viewCount: number;
  resumeTitle: string;
  userId: string;
}

export default function SharedResumePage() {
  const { shareId } = useParams<{ shareId: string }>();
  const [resumeData, setResumeData] = useState<SharedResumeData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const { userId } = useAuth();

  useEffect(() => {
    const checkAndTrackView = async () => {
      if (!shareId) return;

      try {
        setIsLoading(true);

        const viewedResumes = JSON.parse(localStorage.getItem('viewedResumes') || '[]');
        const hasViewedBefore = viewedResumes.includes(shareId);

        const response = await fetch(`/api/sharing/${shareId}?countView=${!hasViewedBefore}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch resume');
        }

        const { data } = await response.json();
        setResumeData(data);

        if (!hasViewedBefore) {
          localStorage.setItem('viewedResumes', JSON.stringify([...viewedResumes, shareId]));
        }
      } catch (err) {
        console.error('Error fetching shared resume:', err);
        setError('This shared resume could not be found or has expired.');
      } finally {
        setIsLoading(false);
      }
    };

    checkAndTrackView();
  }, [shareId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-sm sm:text-base text-gray-600">Loading shared resume...</p>
        </div>
      </div>
    );
  }

  if (error || !resumeData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-red-50 p-6 sm:p-8 rounded-lg shadow-lg max-w-lg text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-red-700 mb-3 sm:mb-4">
            Resume Not Found
          </h2>
          <p className="text-sm sm:text-base text-gray-700">
            {error || 'This shared resume could not be found.'}
          </p>
          <Link href="/" className="mt-4 inline-block text-blue-600 hover:underline">
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="py-2 sm:py-4 px-2 sm:px-4 bg-gray-50 relative">
        {isMobile && (
          <div className="fixed bottom-6 right-6 z-50">
            <Link
              href={resumeData.pdfUrl}
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
                    {resumeData.resumeTitle || 'Untitled Resume'}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1 text-gray-600 text-xs sm:text-sm">
                    <div className="flex items-center">
                      <span className="font-medium mr-1">Author:</span>
                      <span>{resumeData.authorName}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={isMobile ? 12 : 14} className="mr-1" />
                      <span>{format(new Date(resumeData.lastUpdated), 'MMM dd, yyyy')}</span>
                    </div>
                    {userId === resumeData.userId && (
                      <div className="flex items-center">
                        <Eye size={isMobile ? 12 : 14} className="mr-1" />
                        <span>
                          {resumeData.viewCount} view{resumeData.viewCount === 1 ? '' : 's'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* PDF Viewer with controls */}
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

              <div
                className={`bg-white rounded-lg border border-gray-300 overflow-hidden shadow-sm max-w-6xl mx-auto touch-manipulation`}
              >
                {isMobile && (
                  <div className="p-4 w-full flex items-center justify-center bg-gray-50 border-b border-gray-200">
                    <Link
                      href={resumeData.pdfUrl}
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
                    data={`${resumeData.pdfUrl}#view='Fit'`}
                    type="application/pdf"
                    className="absolute top-0 left-0 w-full h-full"
                    aria-label="Shared Resume PDF"
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gray-50">
                      <p className="mb-4 text-gray-600">Unable to display PDF preview.</p>
                      <Link
                        href={resumeData.pdfUrl}
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

            {/* Footer with Open in new tab button */}
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
                    href={resumeData.pdfUrl}
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
