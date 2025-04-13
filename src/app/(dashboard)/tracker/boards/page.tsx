'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useUser } from '@clerk/nextjs';
import {
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useGetBoardsQuery,
} from '@/store/services/applicationTrackerBoard';

export default function BoardsPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createBoard, { isLoading: isSubmitting }] = useCreateBoardMutation();
  const [deleteBoard, { isLoading: isDeleting }] = useDeleteBoardMutation();
  const user = useUser();
  const userId = user?.user?.id;

  const { data: boards = [], isLoading } = useGetBoardsQuery();

  const handleCreateBoard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('boardName') as string;
    const description = formData.get('boardDescription') as string;

    try {
      const newBoard = await createBoard({ name, description }).unwrap();
      toast.success('Board created successfully!');
      setIsModalOpen(false);
      router.push(`/tracker/boards/${newBoard.id}`);
    } catch (err) {
      console.log('Error creating board', err);
      toast.error('Could not create board. Please try again.');
    }
  };

  const handleDeleteBoard = async (boardId: string) => {
    if (!confirm('Are you sure you want to delete this board?')) return;

    try {
      await deleteBoard({ id: boardId, userId: userId! }).unwrap();
      toast.success('Board deleted successfully!');
    } catch (err) {
      console.log('Error deleting board', err);
      toast.error('Could not delete board. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="size-12 animate-spin rounded-full border-y-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-indigo-600">My Job Boards</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700"
        >
          <span>+</span>
          <span>Create Board</span>
        </button>
      </header>

      {boards.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 py-12">
          <div className="max-w-md text-center">
            <h2 className="mb-2 text-xl font-semibold">No boards yet</h2>
            <p className="mb-6 text-gray-600">
              Create your first board to start tracking job applications
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-md bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700"
            >
              Create Board
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {boards.map((board) => (
            <div
              key={board.id}
              className="group relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <Link href={`/tracker/boards/${board.id}`} className="block">
                <h3 className="mb-2 text-xl font-semibold text-indigo-600">{board.name}</h3>
                <p className="mb-4 text-gray-600">{board.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Updated {board.updatedAt}</span>
                </div>
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteBoard(board.id);
                }}
                className="absolute right-4 top-4 rounded-full p-2 text-red-600 opacity-0 transition-opacity hover:bg-red-100 group-hover:opacity-100"
                disabled={isDeleting}
                title="Delete board"
              >
                {isDeleting ? (
                  <svg
                    className="size-5 animate-spin"
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
                    className="size-5"
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
            className="flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-100 p-6 transition-colors hover:bg-gray-200"
          >
            <span className="mb-2 text-3xl text-indigo-600">+</span>
            <span className="text-gray-600">Create New Board</span>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
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
                <label htmlFor="boardName" className="mb-1 block font-medium text-gray-700">
                  Board Name *
                </label>
                <input
                  type="text"
                  id="boardName"
                  name="boardName"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., UX Designer Applications"
                  disabled={isSubmitting}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="boardDescription" className="mb-1 block font-medium text-gray-700">
                  Description (Optional)
                </label>
                <textarea
                  id="boardDescription"
                  name="boardDescription"
                  rows={3}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="What's this board for?"
                  disabled={isSubmitting}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="boardTemplate" className="mb-1 block font-medium text-gray-700">
                  Template (Optional)
                </label>
                <select
                  id="boardTemplate"
                  name="boardTemplate"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                  className="rounded-md bg-gray-200 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-300"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex min-w-[120px] items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="-ml-1 mr-2 size-4 animate-spin text-white"
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
