import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'La-Resume',
    short_name: 'La-Resume',
    description: 'Create perfect, ATS-friendly resumes for free. Export to PDF or LaTeX instantly.',
    display: 'standalone',
    start_url: '/',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '16x16 32x32',
        type: 'image/x-icon',
      },
      {
        src: '/favicon-light.ico',
        sizes: '16x16 32x32',
        type: 'image/x-icon',
      },
      {
        src: '/favicon-dark.ico',
        sizes: '16x16 32x32',
        type: 'image/x-icon',
      },
    ],
  };
}
