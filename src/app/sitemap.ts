import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Only publicly-crawlable, indexable routes belong here. The /templates/*
  // routes live under the auth-gated (dashboard) group and 307-redirect to
  // sign-in, so they are intentionally excluded.
  return [
    {
      url: 'https://la-resume.com',
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://la-resume.com/contact-us',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://la-resume.com/privacy-policy',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: 'https://la-resume.com/refund-and-cancellation',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: 'https://la-resume.com/terms-and-conditions',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];
}
