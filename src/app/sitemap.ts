import type { MetadataRoute } from 'next';
import { PROJECTS, SITE } from '../data/portfolio';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE.indexable) return [];

  return [
    { url: SITE.url, changeFrequency: 'monthly', priority: 1 },
    ...PROJECTS.map(project => ({
      url: `${SITE.url}/projects/${project.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
