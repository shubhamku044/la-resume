import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { deedyResumeData, Sb2novResumeData } from '@/lib/templates/index';

// Define the actual Resume type from the database
interface Resume {
  id: string;
  title: string;
  slug: string;
  data: object | deedyResumeData | Sb2novResumeData; // ✅ Now supports any JSON object
  type: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  folderId: string | null;
}

// ResumeType now accepts string for type
// type ResumeType<T extends string> = T extends keyof typeof resumesMap
//   ? Extract<(typeof resumesMap)[T]['templateType'], object>
//   : object; // ✅ Ensures flexibility

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
        type: string; // ✅ Now explicitly a string
        data: object; // ✅ Made generic for flexibility
        slug: string;
      }
    >({
      query: ({ clerk_id, title, type, data, slug }) => ({
        url: `/${clerk_id}/resume/${slug}`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: { title, type, data },
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
  }),
});

export const {
  useGetResumesQuery,
  useGetResumeBySlugQuery,
  useSaveResumeMutation,
  useDeleteResumeMutation,
} = templateApi;