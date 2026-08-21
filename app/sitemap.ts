import type { MetadataRoute } from 'next';

import { absoluteUrl, pages } from '../lib/site';

// Next serves this at /sitemap.xml. Routes come from lib/site.ts, so adding
// a page there is enough to get it indexed.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return pages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified,
    changeFrequency: page.changefreq,
    priority: page.priority,
  }));
}
