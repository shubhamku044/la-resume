'use client';
import { Job } from '@/types';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';

// Updated types to align with the expected data structure from BoardPage
interface BoardData {
  id: string;
  name: string;
  description: string | null;
  lists: {
    id: string;
    name: string;
    order: number;
  }[];
}

interface JobsByList {
  [listId: string]: Job[];
}

interface IProps {
  board: BoardData | undefined;
  jobsByList: JobsByList | undefined;
}

interface Column {
  id: string;
  title: string;
  cards: Job[];
}

export function Board({ board, jobsByList }: IProps) {
  console.log('Board component rendered');
  console.log('Board:', board);
  console.log('Jobs by lists:', jobsByList);
  const [columns, setColumns] = useState<Column[]>([]);
  useEffect(() => {
    console.log('useEffect triggered');
    if (board?.lists && Array.isArray(board.lists)) {
      const sortedLists = [...board.lists]?.sort((a, b) => a.order - b.order);
      const initialColumns: Column[] = sortedLists.map((list) => ({
        id: list.id,
        title: list.name,
        cards: jobsByList?.[list.id] ?? [],
      }));
      console.log('Initial Columns:', initialColumns);
      setColumns(initialColumns);
    } else {
      console.log('board?.lists is not available or not an array');
      setColumns([]);
    }
  }, [board, jobsByList]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) return;

    // No movement
    if (source.droppableId === destination.droppableId && source.index === destination.index)
      return;

    const newColumns = [...columns];
    const sourceCol = newColumns.find((c) => c.id === source.droppableId)!;
    const destCol = newColumns.find((c) => c.id === destination.droppableId)!;

    const [removed] = sourceCol.cards.splice(source.index, 1);
    destCol.cards.splice(destination.index, 0, removed);

    setColumns(newColumns);

    // TODO: Implement API call to update the listId of the dragged job
    // and potentially the order of items in both source and destination lists.
    // This part is crucial for persisting the changes in the database.
    console.log('Drag End Result:', {
      draggedJobId: removed.id,
      sourceListId: source.droppableId,
      destinationListId: destination.droppableId,
      sourceIndex: source.index,
      destinationIndex: destination.index,
    });
  };

  console.log('Columns', columns);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto p-4">
        {columns.map((column) => (
          <ColumnComponent key={column.id} column={column} />
        ))}
      </div>
    </DragDropContext>
  );
}

interface ColumnComponentProps {
  column: Column;
}

function ColumnComponent({ column }: ColumnComponentProps) {
  return (
    <Droppable droppableId={column.id}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={`w-64 shrink-0 rounded-lg bg-gray-100 p-4 ${
            snapshot.isDraggingOver ? 'bg-gray-200' : ''
          }`}
        >
          <h2 className="mb-4 font-bold">{column.title}</h2>
          <div className="min-h-[20px] space-y-2">
            {column.cards.map((card, index) => (
              <CardComponent key={card.id} card={card} index={index} />
            ))}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

interface CardComponentProps {
  card: Job;
  index: number;
}

function CardComponent({ card, index }: CardComponentProps) {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`rounded border border-gray-200 bg-white p-4 shadow-sm ${
            snapshot.isDragging ? 'opacity-70' : ''
          }`}
        >
          <h3 className="text-sm font-medium">{card.title}</h3>
          <p className="text-xs text-gray-500">{card.company}</p>
        </div>
      )}
    </Draggable>
  );
}
