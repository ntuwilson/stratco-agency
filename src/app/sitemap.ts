import type { MetadataRoute } from 'next';
import { CASE_STUDIES } from '@/data/stratcoData';
import { SITE_URL } from '@/config/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/work/`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    ...CASE_STUDIES.map((project) => ({
      url: `${SITE_URL}/work/${project.slug}/`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ];
}
