import { Job } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type JobsByList = {
  [listId: string]: Job[];
};

export const jobApi = createApi({
  reducerPath: 'jobApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    cache: 'no-cache',
  }),
  tagTypes: ['Jobs', 'Board'],

  endpoints: (builder) => ({
    getJobsByBoard: builder.query<{ jobsByList: JobsByList }, string>({
      query: (boardId) => `boards/${boardId}/jobs`,
      // Move condition logic to extraOptions.skip instead of using condition property
      extraOptions: {
        skip: (boardId: string) => !Boolean(boardId) || boardId.length === 0,
      },
      providesTags: (result, error, boardId) =>
        result
          ? [
              { type: 'Jobs', id: boardId },
              { type: 'Board', id: boardId },
              ...Object.keys(result.jobsByList).map((listId) => ({
                type: 'Jobs' as const,
                id: listId,
              })),
            ]
          : [{ type: 'Jobs', id: boardId }],
    }),

    createJob: builder.mutation<Job, { listId: string; job: Partial<Job>; notes?: string }>({
      query: ({ listId, job, notes }) => ({
        url: `lists/${listId}/jobs`,
        method: 'POST',
        body: { ...job, notes },
      }),
      invalidatesTags: (result) =>
        result
          ? [
              { type: 'Jobs', id: result.listId },
              { type: 'Jobs', id: result.boardId },
              { type: 'Board', id: result.boardId },
            ]
          : ['Jobs'],
    }),

    updateJob: builder.mutation<Job, { jobId: string; listId: string }>({
      query: ({ jobId, listId }) => ({
        url: `jobs/${jobId}`,
        method: 'PATCH',
        body: { listId },
      }),
      invalidatesTags: (result) =>
        result
          ? [
              { type: 'Jobs', id: result.listId },
              { type: 'Jobs', id: result.boardId },
              { type: 'Board', id: result.boardId },
            ]
          : ['Jobs'],
    }),

    deleteJob: builder.mutation<{ message: string }, string>({
      query: (jobId) => ({
        url: `jobs/${jobId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Jobs'],
    }),
  }),
});

export const {
  useGetJobsByBoardQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobApi;
