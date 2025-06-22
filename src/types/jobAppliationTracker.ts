export type List = {
  id: string;
  name: string;
  order: number;
};

export type Board = {
  id: string;
  lists: List[];
  name: string;
  description: string | null;
  updatedAt: string;
};

export type Job = {
  id: string;
  title: string;
  company: string;
  description: string | null;
  location: string | null;
  url: string | null;
  salary: string | null;
  userId: string;
  createdAt: string | Date | null;
  updatedAt: string | Date;
  listId: string;
  boardId: string;
  notes?: Note[];
  appliedAt?: string | Date | null;
};

export type Note = {
  id: string;
  content: string;
  jobId: string;
  userId: string;
  createdAt: string | Date;
};
