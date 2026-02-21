import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://la-resume.com',
      lastModified: new Date('2026-02-21'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://la-resume.com/templates/resume-templates',
      lastModified: new Date('2026-02-21'),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://la-resume.com/templates/made-by-you',
      lastModified: new Date('2026-02-21'),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://la-resume.com/contact-us',
      lastModified: new Date('2026-02-21'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://la-resume.com/privacy-policy',
      lastModified: new Date('2026-02-21'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://la-resume.com/refund-and-cancellation',
      lastModified: new Date('2026-02-21'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://la-resume.com/terms-and-conditions',
      lastModified: new Date('2026-02-21'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://la-resume.com/sign-in',
      lastModified: new Date('2026-02-21'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];
}
