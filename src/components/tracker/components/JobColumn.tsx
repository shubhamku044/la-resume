import { cn } from '@/lib/utils';
import { Column, NewJob } from './types';
import { JobCard } from './JobCard';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Droppable } from '@hello-pangea/dnd';

interface JobColumnProps {
  column: Column;
  setActiveColumn: React.Dispatch<React.SetStateAction<string | null>>;
  setNewJob: React.Dispatch<React.SetStateAction<NewJob | null>>;
  deleteJob: (jobId: string) => Promise<void>;
  isDeleting: string | null;
}

export function JobColumn({
  column,
  setActiveColumn,
  setNewJob,
  deleteJob,
  isDeleting,
}: JobColumnProps) {
  return (
    <Droppable droppableId={column.id}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={cn(
            'w-72 shrink-0 rounded-xl border border-gray-200 bg-gray-50 shadow-sm transition-colors',
            snapshot.isDraggingOver && 'border-blue-200 bg-blue-50'
          )}
        >
          <div className="rounded-t-xl border-b border-gray-200 bg-white p-2 sm:p-3">
            <h2 className="text-sm font-semibold text-gray-800 sm:text-base">{column.title}</h2>
            <p className="mt-0.5 text-xs text-gray-500">{column.cards.length} jobs</p>
          </div>

          <div className="min-h-[150px] space-y-2 p-2 sm:min-h-[200px] sm:space-y-3 sm:p-3">
            {column.cards.map((card, index) => (
              <JobCard
                key={card.id}
                card={card}
                index={index}
                deleteJob={deleteJob}
                isDeleting={isDeleting}
              />
            ))}
            {provided.placeholder}

            {/* Add Job Button */}
            <Button
              variant="ghost"
              className="mt-2 w-full border border-dashed border-gray-300 text-sm text-gray-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 sm:text-base"
              onClick={() => {
                setActiveColumn(column.id);
                setNewJob({ title: '', company: '' });
              }}
            >
              <PlusCircle size={16} className="mr-1.5" />
              <span className="hidden sm:inline">Add Job</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>
        </div>
      )}
    </Droppable>
  );
}
