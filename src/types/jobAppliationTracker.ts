import { List } from '@prisma/client';

export type Job = {
  id: string;
  title: string;
  company: string;
  listId: string;
  boardId: string;
  status?: string;
  location?: string;
  url?: string;
  salary?: string;
  appliedAt?: string;
};

export type Board = {
  id: string;
  lists: List[];
  name: string;
  description: string;
  applicationCount: number;
  updatedAt: string;
};
