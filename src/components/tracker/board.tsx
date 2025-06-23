'use client';

import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} from '@/store/services/jobApi';

import { JobColumn } from './components/JobColumn';
import { JobCreationModal } from './components/JobCreationModal';
import { BoardData, Column, JobsByList, NewJob } from './components/types';

interface IProps {
  board: BoardData | undefined;
  jobsByList: JobsByList | undefined;
}

export function Board({ board, jobsByList }: IProps) {
  const [columns, setColumns] = useState<Column[]>([]);
  const [activeColumn, setActiveColumn] = useState<string | null>(null);
  const [newJob, setNewJob] = useState<NewJob | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [maxColumnHeight, setMaxColumnHeight] = useState<number>(0);

  // RTK Query mutation hooks
  const [updateJob] = useUpdateJobMutation();
  const [createJob, { isLoading: isCreating }] = useCreateJobMutation();
  const [deleteJob] = useDeleteJobMutation();

  useEffect(() => {
    if (board?.lists && Array.isArray(board.lists)) {
      const sortedLists = [...board.lists]?.sort((a, b) => a.order - b.order);
      const initialColumns: Column[] = sortedLists.map((list) => ({
        id: list.id,
        title: list.name,
        cards: jobsByList?.[list.id] ?? [],
      }));
      setColumns(initialColumns);

      // Calculate max jobs to determine column height
      const maxJobs = Math.max(...Object.values(jobsByList || {}).map((jobs) => jobs.length), 1);
      // More accurate height calculation: header (60px) + padding (24px) + jobs (90px each) + add button (44px) + extra padding (50px)
      setMaxColumnHeight(Math.max(400, 60 + 24 + maxJobs * 90 + 44 + 50));
    } else {
      setColumns([]);
      setMaxColumnHeight(500); // Default height
    }
  }, [board, jobsByList]);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    // Dropped outside the list
    if (!destination) return;

    // No movement
    if (source.droppableId === destination.droppableId && source.index === destination.index)
      return;

    // Store the initial state for possible revert
    const originalColumns = JSON.parse(JSON.stringify(columns));

    try {
      // Create a deep copy to avoid mutation issues
      const newColumns = JSON.parse(JSON.stringify(columns));
      const sourceCol = newColumns.find((c: Column) => c.id === source.droppableId);
      const destCol = newColumns.find((c: Column) => c.id === destination.droppableId);

      if (!sourceCol || !destCol || !sourceCol.cards || !destCol.cards) {
        console.error('Source or destination column not found, or cards array is missing');
        return;
      }

      // Get the item being moved
      const movedItem = { ...sourceCol.cards[source.index] };

      // Remove from source
      sourceCol.cards = [
        ...sourceCol.cards.slice(0, source.index),
        ...sourceCol.cards.slice(source.index + 1),
      ];

      // Add to destination
      destCol.cards = [
        ...destCol.cards.slice(0, destination.index),
        movedItem,
        ...destCol.cards.slice(destination.index),
      ];

      // Update the state optimistically
      setColumns(newColumns);

      // Make API call for both within-list and between-list movements
      await updateJob({
        jobId: draggableId,
        listId: destination.droppableId,
      }).unwrap();

      // Different success message based on whether it was moved between lists or just reordered
      if (source.droppableId !== destination.droppableId) {
        toast.success('Job moved to different list successfully');
      } else {
        toast.success('Job position updated successfully');
      }
    } catch (error) {
      console.error('Error updating job position:', error);
      toast.error('Could not update job position');

      // Revert the UI change on error by restoring the original state
      setColumns(originalColumns);
    }
  };

  const handleCreateJob = async (listId: string) => {
    try {
      if (!newJob?.title || !newJob?.company) {
        toast.error('Job title and company are required');
        return;
      }

      // Use RTK Query mutation to create a job - extract notes as separate parameter
      await createJob({
        listId,
        job: {
          title: newJob.title,
          company: newJob.company,
        },
        notes: newJob.notes,
      }).unwrap();

      setNewJob(null);
      setActiveColumn(null);
      toast.success('Job created successfully');
    } catch (error) {
      console.error('Error creating job:', error);
      toast.error('Could not create job');
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    try {
      setIsDeleting(jobId);
      // Use RTK Query mutation to delete a job
      await deleteJob(jobId).unwrap();

      // Update the local state to remove the deleted job
      setColumns((prevColumns) => {
        return prevColumns.map((col) => {
          return {
            ...col,
            cards: col.cards.filter((card) => card.id !== jobId),
          };
        });
      });

      toast.success('Job deleted successfully');
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('Could not delete job');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex min-h-[calc(100vh-120px)] flex-col sm:min-h-[calc(100vh-150px)]">
        <div className="grow overflow-x-auto">
          <div
            className="flex min-w-fit gap-4 p-2 pb-6 sm:gap-5 sm:p-6 sm:pb-10"
            style={{ minHeight: `${maxColumnHeight}px` }}
          >
            {columns.map((column) => (
              <JobColumn
                key={column.id}
                column={column}
                setActiveColumn={setActiveColumn}
                setNewJob={setNewJob}
                deleteJob={handleDeleteJob}
                isDeleting={isDeleting}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Job Creation Modal */}
      <JobCreationModal
        activeColumn={activeColumn}
        newJob={newJob}
        setNewJob={setNewJob}
        setActiveColumn={setActiveColumn}
        handleCreateJob={handleCreateJob}
        isCreating={isCreating}
      />
    </DragDropContext>
  );
}
