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

              {card.notes && card.notes.length > 0 && (
                <div className="mt-2 space-y-1">
                  {card.notes.slice(0, 2).map((note) => (
                    <p key={note.id} className="line-clamp-1 text-xs text-gray-600">
                      {note.content}
                    </p>
                  ))}
                  {card.notes.length > 2 && (
                    <p className="text-xs text-gray-400">+{card.notes.length - 2} more notes</p>
                  )}
                </div>
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
