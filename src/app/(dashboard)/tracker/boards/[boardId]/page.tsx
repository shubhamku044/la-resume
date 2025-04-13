'use client';

import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Board } from '@/components/tracker';
import { useGetJobsByBoardQuery } from '@/store/services/jobApi';
import { useGetBoardQuery } from '@/store/services/applicationTrackerBoard';

export default function BoardPage() {
  const { boardId } = useParams<{ boardId: string }>();
  const router = useRouter();
  const { data: board, isLoading: isBoardLoading } = useGetBoardQuery(boardId!, {
    skip: !boardId,
  });
  const { data: jobsData, isLoading: isJobsLoading } = useGetJobsByBoardQuery(boardId!, {
    skip: !boardId,
  });
  if (isBoardLoading || isJobsLoading) return <div>Loading...</div>;
  if (!board || !jobsData) return <div>Failed to load board</div>;

  /*
    const createJob = async (listId: string) => {
      try {
        const response = await fetch(`/api/lists/${listId}/jobs`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: newJob?.title,
            company: newJob?.company,
          }),
        });

        setNewJob(null);
        setActiveColumn(null);
        if (!response.ok) {
          toast.error('Failed to create job');
          return;
        }
        toast.success('Job created successfully');
      } catch (error) {
        console.error('Error creating job:', error);
        toast.error('Could not create job');
        return;
      }
    };
    */

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => router.push('/tracker/boards')}
            className="flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <ChevronLeft className="mr-1" /> Back to Boards
          </button>
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">{board.name}</h1>
            {board.description && <p className="text-gray-600">{board.description}</p>}
          </div>
          <div className="w-24"></div>
        </div>
      </div>
      <Board board={board} jobsByList={jobsData.jobsByList} />
    </div>
  );
}
