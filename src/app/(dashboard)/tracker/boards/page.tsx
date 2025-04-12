// app/boards/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useUser } from '@clerk/nextjs';
type Board = {
  id: string;
  name: string;
  description: string;
  applicationCount: number;
  updatedAt: string;
};

export default function BoardsPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boards, setBoards] = useState<Board[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const user = useUser();
  const userId = user?.user?.id;

  // Fetch boards on component mount

  useEffect(() => {
    const fetchBoards = async () => {
      if (!userId) return; // Don't fetch if userId isn't available yet

      try {
        const response = await fetch(`/api/boards?userId=${userId}`);
        if (!response.ok) throw new Error('Failed to fetch boards');
        const data = await response.json();
        setBoards(data);
      } catch (error) {
        toast.error('Could not load boards. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBoards();
  }, [userId]);

  const handleCreateBoard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const boardData = {
      name: formData.get('boardName') as string,
      description: formData.get('boardDescription') as string,
      template: formData.get('boardTemplate') as string,
    };

    try {
      const response = await fetch('/api/boards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, name: boardData.name, description: boardData.description }),
      });

      if (!response.ok) throw new Error('Failed to create board');

      const newBoard = await response.json();
      setBoards([...boards, newBoard]);
      setIsModalOpen(false);
      toast.success('Board created successfully!');

      // Redirect to the new board
      router.push(`/boards/${newBoard.id}`);
    } catch (error) {
      toast.error('Could not create board. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBoard = async (boardId: string) => {
    if (!confirm('Are you sure you want to delete this board?')) return;

    setIsDeleting(boardId);
    try {
      const response = await fetch(`/api/boards/${boardId}`, {
        method: 'DELETE',
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) throw new Error('Failed to delete board');

      setBoards(boards.filter((board) => board.id !== boardId));
      toast.success('Board deleted successfully!');
    } catch (error) {
      toast.error('Could not delete board. Please try again.');
    } finally {
      setIsDeleting(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-600">My Job Boards</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2"
        >
          <span>+</span>
          <span>Create Board</span>
        </button>
      </header>

      {boards.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-center max-w-md">
            <h2 className="text-xl font-semibold mb-2">No boards yet</h2>
            <p className="text-gray-600 mb-6">
              Create your first board to start tracking job applications
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Create Board
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.map((board) => (
            <div
              key={board.id}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow relative group border border-gray-200"
            >
              <Link href={`/boards/${board.id}`} className="block">
                <h3 className="text-xl font-semibold text-indigo-600 mb-2">{board.name}</h3>
                <p className="text-gray-600 mb-4">{board.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{board.applicationCount} applications</span>
                  <span>Updated {board.updatedAt}</span>
                </div>
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteBoard(board.id);
                }}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-red-100 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                disabled={isDeleting === board.id}
                title="Delete board"
              >
                {isDeleting === board.id ? (
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
          ))}

          <div
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-100 p-6 rounded-lg flex flex-col items-center justify-center min-h-[180px] hover:bg-gray-200 transition-colors cursor-pointer border-2 border-dashed border-gray-300"
          >
            <span className="text-3xl mb-2 text-indigo-600">+</span>
            <span className="text-gray-600">Create New Board</span>
          </div>
        </div>
      )}

      {/* Create Board Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-indigo-600">Create New Board</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
                disabled={isSubmitting}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateBoard}>
              <div className="mb-4">
                <label htmlFor="boardName" className="block font-medium mb-1 text-gray-700">
                  Board Name *
                </label>
                <input
                  type="text"
                  id="boardName"
                  name="boardName"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., UX Designer Applications"
                  disabled={isSubmitting}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="boardDescription" className="block font-medium mb-1 text-gray-700">
                  Description (Optional)
                </label>
                <textarea
                  id="boardDescription"
                  name="boardDescription"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="What's this board for?"
                  disabled={isSubmitting}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="boardTemplate" className="block font-medium mb-1 text-gray-700">
                  Template (Optional)
                </label>
                <select
                  id="boardTemplate"
                  name="boardTemplate"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  disabled={isSubmitting}
                >
                  <option value="">Blank Board</option>
                  <option value="default">Default Job Pipeline</option>
                  <option value="tech">Tech Company Pipeline</option>
                  <option value="design">Design Roles Pipeline</option>
                </select>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center min-w-[120px]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating...
                    </>
                  ) : (
                    'Create Board'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
