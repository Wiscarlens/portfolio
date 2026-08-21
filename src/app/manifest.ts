import type { MetadataRoute } from 'next';

import { person, site } from '../lib/site';

// Next serves this at /manifest.webmanifest; the root layout links it.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${person.brandName} | ${person.jobTitle}`,
    short_name: person.brandName,
    description: site.description,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: site.themeColor,
    theme_color: site.themeColor,
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
    ],
  };
}
