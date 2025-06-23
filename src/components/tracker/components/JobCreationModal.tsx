import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { NewJob } from './types';

interface JobCreationModalProps {
  activeColumn: string | null;
  newJob: NewJob | null;
  setNewJob: React.Dispatch<React.SetStateAction<NewJob | null>>;
  setActiveColumn: React.Dispatch<React.SetStateAction<string | null>>;
  handleCreateJob: (listId: string) => Promise<void>;
  isCreating: boolean;
}

export function JobCreationModal({
  activeColumn,
  newJob,
  setNewJob,
  setActiveColumn,
  handleCreateJob,
  isCreating,
}: JobCreationModalProps) {
  if (!activeColumn) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-white p-4 shadow-xl sm:p-6">
        <div className="mb-4 flex items-center justify-between sm:mb-5">
          <h3 className="text-lg font-semibold sm:text-xl">Add New Job</h3>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 sm:size-10"
            onClick={() => {
              setActiveColumn(null);
              setNewJob(null);
            }}
          >
            <X size={16} className="sm:size-5" />
          </Button>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 sm:mb-1.5">
              Job Title *
            </label>
            <input
              type="text"
              value={newJob?.title || ''}
              onChange={(e) =>
                setNewJob((prev) => ({
                  title: e.target.value,
                  company: prev?.company || '',
                  ...(prev?.notes !== undefined && { notes: prev.notes }),
                }))
              }
              className="w-full rounded-lg border border-gray-300 p-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:p-2.5"
              placeholder="e.g. Frontend Developer"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 sm:mb-1.5">
              Company *
            </label>
            <input
              type="text"
              value={newJob?.company || ''}
              onChange={(e) =>
                setNewJob((prev) => ({
                  title: prev?.title || '',
                  company: e.target.value,
                  ...(prev?.notes !== undefined && { notes: prev.notes }),
                }))
              }
              className="w-full rounded-lg border border-gray-300 p-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:p-2.5"
              placeholder="e.g. Acme Inc."
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 sm:mb-1.5">Notes</label>
            <textarea
              value={newJob?.notes || ''}
              onChange={(e) =>
                setNewJob((prev) => ({
                  title: prev?.title || '',
                  company: prev?.company || '',
                  notes: e.target.value,
                }))
              }
              className="w-full rounded-lg border border-gray-300 p-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:p-2.5"
              placeholder="Any additional information..."
              rows={3}
            />
          </div>

          <div className="flex flex-col space-y-2 pt-3 sm:flex-row sm:justify-end sm:space-x-2.5 sm:space-y-0 sm:pt-4">
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => {
                setActiveColumn(null);
                setNewJob(null);
              }}
            >
              Cancel
            </Button>
            <Button
              className="w-full sm:w-auto"
              onClick={() => handleCreateJob(activeColumn)}
              disabled={isCreating}
            >
              {isCreating ? 'Adding...' : 'Add Job'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
