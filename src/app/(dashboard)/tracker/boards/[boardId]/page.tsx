'use client';

import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, RefreshCcw } from 'lucide-react';
import { Board } from '@/components/tracker';
import { useGetJobsByBoardQuery } from '@/store/services/jobApi';
import { useGetBoardQuery } from '@/store/services/applicationTrackerBoard';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function BoardPage() {
  const { boardId } = useParams<{ boardId: string }>();
  const router = useRouter();

  const {
    data: board,
    isLoading: isBoardLoading,
    error: boardError,
    refetch: refetchBoard,
  } = useGetBoardQuery(boardId!, {
    skip: !boardId,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: jobsData,
    isLoading: isJobsLoading,
    error: jobsError,
    refetch: refetchJobs,
  } = useGetJobsByBoardQuery(boardId!, {
    skip: !boardId,
    refetchOnMountOrArgChange: true,
  });

  // Handle any errors
  useEffect(() => {
    if (boardError) {
      toast.error('Failed to load board information');
      console.error('Board fetch error:', boardError);
    }

    if (jobsError) {
      toast.error('Failed to load jobs information');
      console.error('Jobs fetch error:', jobsError);
    }
  }, [boardError, jobsError]);

  // Periodically refetch data to keep the UI up-to-date
  useEffect(() => {
    if (!boardId) return;

    // Refresh data on initial load
    const refreshData = () => {
      refetchBoard();
      refetchJobs();
    };

    // Refresh data every minute instead of every 5 seconds (less aggressive)
    const intervalId = setInterval(refreshData, 60000);

    // Clean up on unmount
    return () => clearInterval(intervalId);
  }, [boardId, refetchBoard, refetchJobs]);

  // Show enhanced loading state while data is being fetched
  if (isBoardLoading || isJobsLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between pt-6">
            <Button
              variant="ghost"
              className="flex items-center text-indigo-600 hover:text-indigo-800"
              onClick={() => router.push('/tracker/boards')}
            >
              <ChevronLeft className="mr-1" size={16} /> Back to Boards
            </Button>

            <div className="flex items-center space-x-4">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-6 w-64" />
            </div>

            <div className="w-24">
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        </div>

        <div className="px-6 pb-10 pt-4">
          <div className="flex space-x-5 overflow-x-auto">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-72 shrink-0 rounded-xl border border-gray-200 bg-gray-50 shadow-sm"
              >
                <div className="rounded-t-xl border-b border-gray-200 bg-white p-3">
                  <Skeleton className="mb-2 h-5 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>

                <div className="space-y-3 p-3">
                  {[1, 2, 3].map((j) => (
                    <Skeleton key={j} className="h-24 w-full rounded-lg" />
                  ))}
                  <Skeleton className="mt-4 h-9 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show enhanced error state if data failed to load
  if (!board || !jobsData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between pt-6">
            <Button
              variant="ghost"
              className="flex items-center text-indigo-600 hover:text-indigo-800"
              onClick={() => router.push('/tracker/boards')}
            >
              <ChevronLeft className="mr-1" size={16} /> Back to Boards
            </Button>
          </div>

          <div className="flex h-[60vh] flex-col items-center justify-center px-4 text-center">
            <div className="w-full max-w-lg rounded-lg border border-gray-200 bg-white p-8 shadow-md">
              <div className="mx-auto mb-6 flex size-12 items-center justify-center rounded-full bg-red-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>

              <h2 className="mb-4 text-xl font-semibold text-gray-900">Failed to load board</h2>
              <p className="mb-6 text-gray-600">
                There was an issue loading this board&apos;s data. Please try again or return to the
                boards page.
              </p>

              <div className="flex flex-col justify-center space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
                <Button
                  variant="outline"
                  onClick={() => router.push('/tracker/boards')}
                  className="sm:w-auto"
                >
                  Return to Boards
                </Button>
                <Button
                  onClick={() => {
                    refetchBoard();
                    refetchJobs();
                    toast.info('Attempting to reload board data...');
                  }}
                  className="sm:w-auto"
                >
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Button
              variant="ghost"
              className="flex items-center text-indigo-600 hover:text-indigo-800"
              onClick={() => router.push('/tracker/boards')}
            >
              <ChevronLeft className="mr-1" size={16} /> Back to Boards
            </Button>

            <div className="flex items-center">
              <h1 className="mr-3 text-xl font-bold text-gray-900">{board.name}</h1>
              {board.description && (
                <span className="hidden max-w-md truncate text-sm text-gray-600 md:block">
                  {board.description}
                </span>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="flex items-center text-indigo-600"
              onClick={() => {
                refetchBoard();
                refetchJobs();
                toast.success('Board refreshed');
              }}
            >
              <RefreshCcw size={14} className="mr-1.5" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      <Board board={board} jobsByList={jobsData.jobsByList} />
    </div>
  );
}
