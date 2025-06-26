import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { deedyResumeData, MTeckResumeData, Sb2novResumeData } from '@/lib/templates/index';

// Define the actual Resume type from the database
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
    // Add error handling for better compatibility
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
      // Function-based tags for reliable cache management
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
      // Function-based tags
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
      // Function-based invalidation tags
      invalidatesTags: (result) =>
        result
          ? [
              { type: 'Resume' as const, id: result.id },
              { type: 'Resume', id: 'LIST' },
            ]
          : [{ type: 'Resume', id: 'LIST' }],
    }),

    createResume: builder.mutation<
      Resume,
      {
        clerk_id: string;
        title?: string;
        type?: string;
        data: object;
      }
    >({
      query: ({ clerk_id, ...body }) => ({
        url: `/${clerk_id}/resume`,
        method: 'POST',
        body,
      }),
      // Always invalidate the list when creating new resumes
      invalidatesTags: () => [{ type: 'Resume', id: 'LIST' }],
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
        url: '/upload', // You may need to adjust this endpoint
        method: 'POST',
        body: { file, fileName },
      }),
    }),

    deleteImageKitFile: builder.mutation<{ message: string; url: string }, { slug: string }>({
      query: ({ slug }) => ({
        url: '/delete-image', // You may need to adjust this endpoint
        method: 'DELETE',
        body: { slug },
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetResumesQuery,
  useGetResumeBySlugQuery,
  useSaveResumeMutation,
  useCreateResumeMutation,
  useDeleteResumeMutation,
  useUploadImageMutation,
  useDeleteImageKitFileMutation,
} = templateApi;
