import { MetadataRoute } from 'next';
import { templates } from '@/lib/templates';

const BASE = 'https://la-resume.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Only publicly-crawlable, indexable routes belong here. The /templates/*
  // routes live under the auth-gated (dashboard) group and 307-redirect to
  // sign-in, so they are intentionally excluded.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/resume-templates`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/features`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/pricing`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/faq`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/about`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/contact-us`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/privacy-policy`, lastModified, changeFrequency: 'monthly', priority: 0.4 },
    {
      url: `${BASE}/refund-and-cancellation`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${BASE}/terms-and-conditions`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  const templateRoutes: MetadataRoute.Sitemap = templates.map((template) => ({
    url: `${BASE}/resume-templates/${template.id}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...templateRoutes];
}
