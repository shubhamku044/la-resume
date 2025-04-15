import { Board } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const boardApi = createApi({
  reducerPath: 'boardApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Boards'],
  endpoints: (builder) => ({
    getBoards: builder.query<Board[], void>({
      query: () => '/boards',
      providesTags: ['Boards'],
    }),
    getBoard: builder.query<Board, string>({
      query: (boardId) => `/boards/${boardId}`,
      providesTags: ['Boards'],
    }),
    createBoard: builder.mutation<Board, Partial<Board>>({
      query: (newBoard) => ({
        url: '/boards',
        method: 'POST',
        body: newBoard,
      }),
      invalidatesTags: ['Boards'],
    }),
    deleteBoard: builder.mutation<{ success: boolean; id: string }, { id: string; userId: string }>(
      {
        query: ({ id, userId }) => ({
          url: `/boards/${id}`,
          method: 'DELETE',
          body: { userId },
        }),
        invalidatesTags: ['Boards'],
      }
    ),
  }),
});

export const {
  useGetBoardsQuery,
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useGetBoardQuery,
} = boardApi;
