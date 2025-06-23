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
  } = useGetBoardQuery(boardId || '', {
    skip: !boardId,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: jobsData,
    isLoading: isJobsLoading,
    error: jobsError,
    refetch: refetchJobs,
  } = useGetJobsByBoardQuery(boardId || '', {
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
        <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
          <div className="mb-4 flex flex-col space-y-4 pt-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:pt-6">
            <Button
              variant="ghost"
              className="flex items-center self-start text-indigo-600 hover:text-indigo-800"
              onClick={() => router.push('/tracker/boards')}
            >
              <ChevronLeft className="mr-1" size={16} />
              <span className="hidden sm:inline">Back to Boards</span>
              <span className="sm:hidden">Back</span>
            </Button>

            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
              <Skeleton className="h-8 w-full sm:w-40" />
              <Skeleton className="hidden h-6 w-full sm:block sm:w-64" />
            </div>

            <div className="w-full sm:w-24">
              <Skeleton className="h-8 w-full sm:w-20" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto pb-6 pt-2 sm:pb-10 sm:pt-4">
          <div className="flex min-w-fit gap-4 px-2 sm:gap-5 sm:px-6">
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
                    <Skeleton key={j} className="h-20 w-full rounded-lg sm:h-24" />
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
        <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
          <div className="mb-4 flex items-center justify-between pt-4 sm:mb-8 sm:pt-6">
            <Button
              variant="ghost"
              className="flex items-center text-indigo-600 hover:text-indigo-800"
              onClick={() => router.push('/tracker/boards')}
            >
              <ChevronLeft className="mr-1" size={16} />
              <span className="hidden sm:inline">Back to Boards</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </div>

          <div className="flex h-[60vh] flex-col items-center justify-center px-2 text-center sm:px-4">
            <div className="w-full max-w-lg rounded-lg border border-gray-200 bg-white p-4 shadow-md sm:p-8">
              <div className="mx-auto mb-4 flex size-10 items-center justify-center rounded-full bg-red-100 sm:mb-6 sm:size-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5 text-red-600 sm:size-6"
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

              <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100 sm:mb-4 sm:text-xl">
                Failed to load board
              </h2>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-300 sm:mb-6 sm:text-base">
                There was an issue loading this board&apos;s data. Please try again or return to the
                boards page.
              </p>

              <div className="flex flex-col justify-center space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
                <Button
                  variant="outline"
                  onClick={() => router.push('/tracker/boards')}
                  className="w-full sm:w-auto"
                >
                  Return to Boards
                </Button>
                <Button
                  onClick={() => {
                    refetchBoard();
                    refetchJobs();
                    toast.info('Attempting to reload board data...');
                  }}
                  className="w-full sm:w-auto"
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
        <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
          <div className="flex flex-col space-y-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:py-4">
            <Button
              variant="ghost"
              className="flex items-center self-start text-indigo-600 hover:text-indigo-800"
              onClick={() => router.push('/tracker/boards')}
            >
              <ChevronLeft className="mr-1" size={16} />
              <span className="hidden sm:inline">Back to Boards</span>
              <span className="sm:hidden">Back</span>
            </Button>

            <div className="flex flex-col items-start sm:items-center">
              <h1 className="text-lg font-bold text-gray-900 sm:mr-3 sm:text-xl">{board.name}</h1>
              {board.description && (
                <span className="mt-1 max-w-md truncate text-xs text-gray-600 sm:mt-0 sm:text-sm md:block">
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
              <span className="hidden sm:inline">Refresh</span>
              <span className="sm:hidden">↻</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="pb-6">
        <Board board={board} jobsByList={jobsData.jobsByList} />
      </div>
    </div>
  );
}
