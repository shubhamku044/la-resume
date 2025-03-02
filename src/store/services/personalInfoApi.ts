import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PersonalInfo } from '@/types';

export const personalInfoApi = createApi({
  reducerPath: 'personalInfoApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/users' }),
  tagTypes: ['PersonalInfo'],
  endpoints: (builder) => ({
    getPersonalInfo: builder.query<PersonalInfo, string>({
      query: (clerk_id) => `${clerk_id}/personal-info`,
      providesTags: (result) => (result ? [{ type: 'PersonalInfo', id: result.email }] : []),
    }),
    updatePersonalInfo: builder.mutation<
      PersonalInfo,
      { clerk_id: string; data: Partial<PersonalInfo> }
    >({
      query: (personalInfo) => ({
        url: `${personalInfo.clerk_id}/personal-info`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: personalInfo.data,
      }),
      invalidatesTags: (result) => (result ? [{ type: 'PersonalInfo', id: result.email }] : []),
    }),
  }),
});

export const { useGetPersonalInfoQuery, useUpdatePersonalInfoMutation } = personalInfoApi;
