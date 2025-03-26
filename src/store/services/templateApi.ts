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
  baseQuery: fetchBaseQuery({ baseUrl: '/api/templates/users' }), // ✅ Corrected base URL
  tagTypes: ['Resume'],
  endpoints: (builder) => ({
    getResumes: builder.query<
      Resume[], // Expect an array of Resume objects
      { clerk_id: string } // Only clerk_id as input
    >({
      query: ({ clerk_id }) => `${clerk_id}/resume`, // Corrected API endpoint
      providesTags: (result, error, { clerk_id }) =>
        result ? [{ type: 'Resume', id: clerk_id }] : [],
    }),

    // ✅ Fetch Resume by Slug
    getResumeBySlug: builder.query<Resume, { clerk_id: string; slug: string }>({
      query: ({ clerk_id, slug }) => `/${clerk_id}/resume/${slug}`,
      providesTags: (result, error, { clerk_id, slug }) =>
        result ? [{ type: 'Resume', id: `${clerk_id}-${slug}` }] : [],
    }),

    // ✅ Save or Update Resume
    saveResume: builder.mutation<
      Resume,
      {
        clerk_id: string;
        title: string;
        type: string;
        data: object;
        slug: string;
        previewUrl?: string;
      }
    >({
      query: ({ clerk_id, title, type, data, slug, previewUrl }) => ({
        url: `/${clerk_id}/resume/${slug}`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: { title, type, data, previewUrl },
      }),
      invalidatesTags: (result, error, { clerk_id, slug }) =>
        result ? [{ type: 'Resume', id: `${clerk_id}-${slug}` }] : [],
    }),
    deleteResume: builder.mutation<void, { clerk_id: string; slug: string }>({
      query: ({ clerk_id, slug }) => ({
        url: `/${clerk_id}/resume/${slug}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { clerk_id }) => [{ type: 'Resume', id: clerk_id }],
    }),
    uploadImage: builder.mutation<{ url: string }, { file: string; fileName: string }>({
      query: ({ file, fileName }) => ({
        url: '',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: { file, fileName },
      }),
    }),
    deleteImageKitFile: builder.mutation<{ message: string; url: string }, { slug: string }>({
      query: ({ slug }) => ({
        url: `/`,
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: { slug },
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
