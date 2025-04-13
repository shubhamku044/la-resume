'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { Plus, ChevronLeft } from 'lucide-react';

type Board = {
  id: string;
  name: string;
  description: string | null;
  lists: List[];
};

type List = {
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
        console.log('Fetched board:', data);
      } catch (error) {
        console.error('Error fetching board:', error);
        toast.error('Could not load board');
        // router.push('/tracker/boards');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBoard();
  }, [boardId, router]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`/api/boards/${boardId}/jobs`);
        if (!response.ok) throw new Error('Failed to fetch board');
        const data = await response.json();
        console.log('Fetched jobs:', data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        toast.error('Could not load job');
        // router.push('/tracker/boards');
      } finally {
        console.log('Jobs fetched');
      }
    };

    fetchJobs();
  }, [boardId, router]);

  const createJob = async (listId: string) => {
    const response = await fetch(`/api/lists/${listId}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        company: 'New Company',
        position: 'Desired Position',
      }),
    });
    console.log('Response:', response);

    // Update UI with response data
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="size-12 animate-spin rounded-full border-y-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!board) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Board not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
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
          <div className="w-24"></div> {/* Spacer for balance */}
        </div>

        {/* Kanban Board */}
        <DragDropContext
          onDragEnd={() => {
            console.log('Drag ended');
          }}
        >
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {board.lists.map((column) => (
              <Droppable key={column.id} droppableId={column.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="w-56 shrink-0 rounded-lg bg-white p-4 shadow-sm"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-semibold text-gray-800">{column.name}</h3>
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
                      <div className="mb-4 rounded-lg bg-gray-50 p-3">
                        <input
                          type="text"
                          placeholder="Job Title"
                          value={newJob?.title || ''}
                          onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                          className="mb-2 w-full rounded border p-2"
                        />
                        <input
                          type="text"
                          placeholder="Company"
                          value={newJob?.company || ''}
                          onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                          className="mb-2 w-full rounded border p-2"
                        />
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={async () => {
                              setNewJob(null);
                              setActiveColumn(null);
                              console.log('Console', column);
                            }}
                            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={async () => {
                              await createJob(column.id);
                            }}
                            className="rounded bg-indigo-600 px-3 py-1 text-sm text-white hover:bg-indigo-700"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Jobs List */}
                    <div className="space-y-3">{provided.placeholder}</div>
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
