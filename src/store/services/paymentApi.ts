import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    updateUserPaymentStatus: builder.mutation<{ message: string }, { slug: string }>({
      query: ({ slug }) => ({
        url: `/payments/${slug}`,
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      }),
    }),
  }),
});

export const { useUpdateUserPaymentStatusMutation } = paymentApi;
