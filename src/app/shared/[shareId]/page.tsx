'use client';

import { format } from 'date-fns';
import { Calendar, Eye, Maximize } from 'lucide-react';
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
}

export default function SharedResumePage() {
  const { shareId } = useParams<{ shareId: string }>();
  const [resumeData, setResumeData] = useState<SharedResumeData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSharedResume = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/sharing/${shareId}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch resume');
        }

        const { data } = await response.json();
        setResumeData(data);
      } catch (err) {
        console.error('Error fetching shared resume:', err);
        setError('This shared resume could not be found or has expired.');
      } finally {
        setIsLoading(false);
      }
    };

    if (shareId) {
      fetchSharedResume();
    }
  }, [shareId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading shared resume...</p>
        </div>
      </div>
    );
  }

  if (error || !resumeData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-8 rounded-lg shadow-lg max-w-lg text-center">
          <h2 className="text-2xl font-bold text-red-700 mb-4">Resume Not Found</h2>
          <p className="text-gray-700">{error || 'This shared resume could not be found.'}</p>
          <Link href="/" className="mt-4 inline-block text-blue-600 hover:underline">
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          {/* Header with resume info */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Resume</h1>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-600 text-sm">
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Author:</span>
                    <span>{resumeData.authorName}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    <span>{format(new Date(resumeData.lastUpdated), 'MMM dd, yyyy')}</span>
                  </div>
                  <div className="flex items-center">
                    <Eye size={14} className="mr-1" />
                    <span>
                      {resumeData.viewCount} view{resumeData.viewCount === 1 ? '' : 's'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={resumeData.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Maximize size={16} />
                  <span>Open in new tab</span>
                </a>
              </div>
            </div>
          </div>

          {/* PDF Viewer with controls */}
          <div className="p-4 min-w-6xl bg-gray-100">
            <div className="flex justify-between items-center mb-3">
              <div className="text-sm text-gray-600">
                Use controls to zoom in/out or fit to width
              </div>
            </div>

            <div
              className={`bg-white rounded-lg border border-gray-300 overflow-hidden shadow-sm max-w-6xl mx-auto`}
            >
              <div className="relative" style={{ height: '100vh' }}>
                <object
                  data={`${resumeData.pdfUrl}#view='Fit'`}
                  type="application/pdf"
                  className="absolute top-0 left-0 w-full h-full"
                  aria-label="Shared Resume PDF"
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gray-50">
                    <p className="mb-4 text-gray-600">Unable to display PDF preview.</p>
                    <a
                      href={resumeData.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Download PDF
                    </a>
                  </div>
                </object>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50 text-center">
            <p className="text-sm text-gray-600">
              Shared using{' '}
              <Link href="/" className="font-medium text-blue-600 hover:underline">
                LA Resume
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
