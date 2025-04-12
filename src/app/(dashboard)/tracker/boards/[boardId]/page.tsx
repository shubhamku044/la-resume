// app/boards/[boardId]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus, Trash2, Ellipsis, ChevronLeft } from 'lucide-react';

type Board = {
  id: string;
  name: string;
  description: string | null;
  columns: Column[];
};

type Column = {
  id: string;
  name: string;
  order: number;
  jobs: Job[];
};

type Job = {
  id: string;
  title: string;
  company: string;
  status: string;
  location?: string;
  url?: string;
  salary?: string;
  appliedAt?: string;
};

export default function BoardPage() {
  const { boardId } = useParams();
  const router = useRouter();
  const [board, setBoard] = useState<Board | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newJob, setNewJob] = useState<Partial<Job> | null>(null);
  const [activeColumn, setActiveColumn] = useState<string | null>(null);

  // Fetch board data
  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await fetch(`/api/boards/${boardId}`);
        if (!response.ok) throw new Error('Failed to fetch board');
        const data = await response.json();
        setBoard(data);
      } catch (error) {
        toast.error('Could not load board');
        router.push('/boards');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBoard();
  }, [boardId, router]);

  // Handle drag and drop
  const handleDragEnd = async (result: any) => {
    if (!result.destination || !board) return;

    const { source, destination, draggableId } = result;

    // Same column, same position
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    // Optimistic update
    const newColumns = [...board.columns];
    const sourceColumn = newColumns.find((col) => col.id === source.droppableId);
    const destColumn = newColumns.find((col) => col.id === destination.droppableId);
    const job = sourceColumn?.jobs.find((j) => j.id === draggableId);

    if (!sourceColumn || !destColumn || !job) return;

    // Remove from source
    sourceColumn.jobs.splice(source.index, 1);
    // Add to destination
    destColumn.jobs.splice(destination.index, 0, job);

    setBoard({ ...board, columns: newColumns });

    // Update in database
    try {
      await fetch(`/api/jobs/${draggableId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ columnId: destination.droppableId }),
      });
    } catch (error) {
      toast.error('Failed to update job position');
      // Revert if API call fails
      setBoard(board);
    }
  };

  // Create new job
  const handleCreateJob = async (columnId: string) => {
    if (!newJob?.title || !newJob.company) {
      toast.error('Title and company are required');
      return;
    }

    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newJob,
          columnId,
          status: board?.columns.find((c) => c.id === columnId)?.name || 'Applied',
        }),
      });

      if (!response.ok) throw new Error('Failed to create job');

      const createdJob = await response.json();
      setBoard((prev) => {
        if (!prev) return null;
        const newColumns = prev.columns.map((col) => {
          if (col.id === columnId) {
            return { ...col, jobs: [...col.jobs, createdJob] };
          }
          return col;
        });
        return { ...prev, columns: newColumns };
      });

      setNewJob(null);
      setActiveColumn(null);
      toast.success('Job added successfully!');
    } catch (error) {
      toast.error('Failed to create job');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!board) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Board not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.push('/boards')}
            className="flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <ChevronLeft className="mr-1" /> Back to Boards
          </button>
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">{board.name}</h1>
            {board.description && <p className="text-gray-600">{board.description}</p>}
          </div>
          <div className="w-24"></div> {/* Spacer for balance */}
        </div>

        {/* Kanban Board */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {board.columns.map((column) => (
              <Droppable key={column.id} droppableId={column.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex-shrink-0 w-72 bg-white rounded-lg shadow-sm p-4"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold text-gray-800">
                        {column.name} ({column.jobs.length})
                      </h3>
                      <button
                        onClick={() => {
                          setNewJob({ title: '', company: '' });
                          setActiveColumn(column.id);
                        }}
                        className="text-gray-500 hover:text-indigo-600"
                      >
                        <Plus size={18} />
                      </button>
                    </div>

                    {/* Add Job Form */}
                    {activeColumn === column.id && (
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <input
                          type="text"
                          placeholder="Job Title"
                          value={newJob?.title || ''}
                          onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                          className="w-full mb-2 p-2 border rounded"
                        />
                        <input
                          type="text"
                          placeholder="Company"
                          value={newJob?.company || ''}
                          onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                          className="w-full mb-2 p-2 border rounded"
                        />
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => {
                              setNewJob(null);
                              setActiveColumn(null);
                            }}
                            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleCreateJob(column.id)}
                            className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Jobs List */}
                    <div className="space-y-3">
                      {column.jobs.map((job, index) => (
                        <Draggable key={job.id} draggableId={job.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="p-3 bg-white border rounded-lg shadow-xs hover:shadow-sm cursor-pointer"
                              onClick={() => router.push(`/boards/${boardId}/jobs/${job.id}`)}
                            >
                              <div className="flex justify-between">
                                <h4 className="font-medium text-gray-900">{job.title}</h4>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Add delete functionality here
                                  }}
                                  className="text-gray-400 hover:text-red-500"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                              <p className="text-sm text-gray-600">{job.company}</p>
                              {job.location && (
                                <p className="text-xs text-gray-500 mt-1">{job.location}</p>
                              )}
                              {job.appliedAt && (
                                <p className="text-xs text-gray-500 mt-1">
                                  Applied: {new Date(job.appliedAt).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
