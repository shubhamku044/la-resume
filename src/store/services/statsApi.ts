import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface StatsResponse {
  signups: number;
  resumes: number;
}

export const statsApi = createApi({
  reducerPath: 'statsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getStats: builder.query<StatsResponse, void>({
      query: () => `/stats`,
    }),
  }),
});

export const { useGetStatsQuery } = statsApi;
