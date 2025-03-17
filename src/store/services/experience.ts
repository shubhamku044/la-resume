import { Experience } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const experienceApi = createApi({
  reducerPath: 'experienceApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/users' }),
  tagTypes: ['Experience'],
  endpoints: (builder) => ({
    getExperience: builder.query<Experience, string>({
      query: (clerk_id) => `${clerk_id}/experience`,
      providesTags: (result) => (result ? [{ type: 'Experience', id: result.id }] : []),
    }),
    updateExperience: builder.mutation<Experience, { clerk_id: string; data: Partial<Experience> }>(
      {
        query: (experience) => ({
          url: `${experience.clerk_id}/experience`,
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: experience.data,
        }),
        invalidatesTags: (result) => (result ? [{ type: 'Experience', id: result.id }] : []),
      }
    ),
  }),
});

export const { useGetExperienceQuery, useUpdateExperienceMutation } = experienceApi;
