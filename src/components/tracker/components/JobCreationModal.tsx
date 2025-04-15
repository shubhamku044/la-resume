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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl font-semibold">Add New Job</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setActiveColumn(null);
              setNewJob(null);
            }}
          >
            <X size={18} />
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Job Title *</label>
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
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. Frontend Developer"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Company *</label>
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
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. Acme Inc."
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              value={newJob?.notes || ''}
              onChange={(e) =>
                setNewJob((prev) => ({
                  title: prev?.title || '',
                  company: prev?.company || '',
                  notes: e.target.value,
                }))
              }
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Any additional information..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2.5 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setActiveColumn(null);
                setNewJob(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={() => handleCreateJob(activeColumn)} disabled={isCreating}>
              {isCreating ? 'Adding...' : 'Add Job'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
