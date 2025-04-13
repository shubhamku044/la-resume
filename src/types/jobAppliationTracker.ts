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
  appliedAt: string | Date | null;
  updatedAt: string | Date;
  listId: string;
  boardId: string;
};
