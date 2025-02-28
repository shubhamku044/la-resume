import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserDetails } from '@/types/userDetails';

export const userDetailsApi = createApi({
  reducerPath: 'userDetailsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getUserDetails: builder.query<UserDetails, string>({
      query: (clerk_id) => `/user-details?clerk_id=${clerk_id}`,
    }),
    updateUserDetails: builder.mutation<UserDetails, Partial<UserDetails> & { clerk_id: string }>({
      query: (userDetails) => ({
        url: '/user-details',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails),
      }),
    }),
  }),
});

export const { useGetUserDetailsQuery, useUpdateUserDetailsMutation } = userDetailsApi;