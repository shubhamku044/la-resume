import { cn } from '@/lib/utils';
import { Job } from '@/types';
import { Calendar, Briefcase, Trash2 } from 'lucide-react';
import { Draggable } from '@hello-pangea/dnd';
import { Button } from '@/components/ui/button';

interface CardComponentProps {
  card: Job;
  index: number;
  deleteJob: (jobId: string) => Promise<void>;
  isDeleting: string | null;
}

export function JobCard({ card, index, deleteJob, isDeleting }: CardComponentProps) {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            'rounded-lg border bg-white p-3.5 shadow-sm transition-all',
            snapshot.isDragging ? 'shadow-md rotate-1 scale-[1.02]' : ''
          )}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">{card.title}</h3>
              <div className="mt-1.5 flex items-center text-xs text-gray-500">
                <Briefcase className="mr-1 size-3.5" />
                <p>{card.company}</p>
              </div>

              {card.notes && (
                <p className="mt-2 line-clamp-2 text-xs text-gray-600">{card.notes}</p>
              )}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-2">
            {card.createdAt && (
              <div className="flex items-center text-xs text-gray-400">
                <Calendar className="mr-1 size-3" />
                {new Date(card.createdAt).toLocaleDateString()}
              </div>
            )}
            <Button
              variant="destructive"
              size="sm"
              className="ml-auto"
              onClick={() => deleteJob(card.id)}
              disabled={isDeleting === card.id}
            >
              {isDeleting === card.id ? 'Deleting...' : <Trash2 size={14} />}
            </Button>
          </div>
        </div>
      )}
    </Draggable>
  );
}
