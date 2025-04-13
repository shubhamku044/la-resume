'use client';
import { Job } from '@/types';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';

type Card = {
  id: string;
  title: string;
  description: string;
};

type JobCard = {
  id: string;
  title: string;
  description: string;
};

type List = {
  id: string;
  name: string;
  order: number;
  jobCount: number;
};

type BoardData = {
  id: string;
  name: string;
  description: string;
  lists: List[];
};

type Column = {
  id: string;
  title: string;
  cards: JobCard[]; // you can fetch and fill later from RTK Query
};

type JobsByList = Record<string, Job[]>;

interface IProps {
  board: BoardData | undefined;
  jobsByList: JobsByList | undefined;
}

export function Board({ board, jobsByList }: IProps) {
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    if (board?.lists) {
      const initialColumns: Column[] = board.lists
        .sort((a, b) => a.order - b.order)
        .map((list) => ({
          id: list.id,
          title: list.name,
          cards: jobsByList?.[list.id] ?? [],
        }));
      setColumns(initialColumns);
    }
  }, [board, jobsByList]);

  const onDragEnd = (result) => {
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

function ColumnComponent({ column }: { column: Column }) {
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

function CardComponent({ card, index }: { card: Job; index: number }) {
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
