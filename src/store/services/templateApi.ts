import { deedyResumeData, MTeckResumeData, Sb2novResumeData } from '@/lib/templates/index';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Resume {
  id: string;
  title: string;
  slug: string;
  data: object | deedyResumeData | Sb2novResumeData | MTeckResumeData;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  folderId: string | null;
  previewUrl: string;
  hasPaid: boolean;
  orderNumber: string | '';
}

export const templateApi = createApi({
  reducerPath: 'templateApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/templates/users',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Resume'] as const,
  keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getResumes: builder.query<Resume[], { clerk_id: string }>({
      query: ({ clerk_id }) => `/${clerk_id}/resume`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Resume' as const, id })),
              { type: 'Resume', id: 'LIST' },
            ]
          : [{ type: 'Resume', id: 'LIST' }],
    }),

    getResumeBySlug: builder.query<Resume, { clerk_id: string; slug: string }>({
      query: ({ clerk_id, slug }) => `/${clerk_id}/resume/${slug}`,
      providesTags: (result) => (result ? [{ type: 'Resume' as const, id: result.id }] : []),
    }),

    saveResume: builder.mutation<
      Resume,
      {
        clerk_id: string;
        slug: string;
        title?: string;
        type?: string;
        data: object;
        previewUrl?: string;
      }
    >({
      query: ({ clerk_id, slug, ...body }) => ({
        url: `/${clerk_id}/resume/${slug}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result) =>
        result
          ? [
              { type: 'Resume' as const, id: result.id },
              { type: 'Resume', id: 'LIST' },
            ]
          : [{ type: 'Resume', id: 'LIST' }],
    }),

    deleteResume: builder.mutation<void, { clerk_id: string; slug: string }>({
      query: ({ clerk_id, slug }) => ({
        url: `/${clerk_id}/resume/${slug}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [{ type: 'Resume', id: 'LIST' }],
    }),

    uploadImage: builder.mutation<{ url: string }, { file: string; fileName: string }>({
      query: ({ file, fileName }) => ({
        url: '',
        method: 'POST',
        body: { file, fileName },
      }),
    }),

    deleteImageKitFile: builder.mutation<{ message: string }, { slug: string; hasPaid: boolean }>({
      query: ({ slug, hasPaid }) => ({
        url: '/',
        method: 'DELETE',
        body: { slug, hasPaid },
      }),
    }),
  }),
});

export const {
  useGetResumesQuery,
  useGetResumeBySlugQuery,
  useSaveResumeMutation,
  useDeleteResumeMutation,
  useUploadImageMutation,
  useDeleteImageKitFileMutation,
} = templateApi;
