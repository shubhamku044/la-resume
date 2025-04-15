import { Job } from '@/types';

export interface BoardData {
  id: string;
  name: string;
  description: string | null;
  lists: {
    id: string;
    name: string;
    order: number;
  }[];
}

export interface JobsByList {
  [listId: string]: Job[];
}

export interface Column {
  id: string;
  title: string;
  cards: Job[];
}

export interface NewJob {
  title: string;
  company: string;
  notes?: string;
}
