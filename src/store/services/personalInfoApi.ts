import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PersonalInfo } from '@/types';

export const personalInfoApi = createApi({
  reducerPath: 'personalInfoApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getPersonalInfo: builder.query<PersonalInfo, string>({
      query: (clerk_id) => `/personal-info?clerk_id=${clerk_id}`,
    }),
    updatePersonalInfo: builder.mutation<
      PersonalInfo,
      Partial<PersonalInfo> & { clerk_id: string }
    >({
      query: (personalInfo) => ({
        url: '/personal-info',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(personalInfo),
      }),
    }),
  }),
});

export const { useGetPersonalInfoQuery, useUpdatePersonalInfoMutation } = personalInfoApi;