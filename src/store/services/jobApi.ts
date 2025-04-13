import { Job } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type JobsByList = {
  [listId: string]: Job[];
};

export const jobApi = createApi({
  reducerPath: 'jobApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Jobs'],

  endpoints: (builder) => ({
    getJobsByBoard: builder.query<{ jobsByList: JobsByList }, string>({
      query: (boardId) => `boards/${boardId}/jobs`,
      providesTags: ['Jobs'],
    }),

    createJob: builder.mutation<Job, { listId: string; job: Partial<Job> }>({
      query: ({ listId, job }) => ({
        url: `lists/${listId}/jobs`,
        method: 'POST',
        body: job,
      }),
      invalidatesTags: ['Jobs'],
    }),
  }),
});

export const { useGetJobsByBoardQuery, useCreateJobMutation } = jobApi;
