// Builds the Next.js Metadata object for a route from its lib/site.ts entry.
//
// The App Router resolves these exports into <head> at render time — there is
// no <Head> component and no next/head in this router.

import type { Metadata } from 'next';

import { getPageMeta, site } from './site';

/**
 * Metadata for one route. Pass the path exactly as registered in lib/site.ts.
 *
 *   export const metadata = pageMetadata('/about');
 *
 * `title` here is the bare page name; the root layout's title.template turns
 * it into 'About | J.L Wiscarlens'. Titles are relative on purpose so the
 * suffix is defined in exactly one place.
 */
export const pageMetadata = (path: string): Metadata => {
  const { title, description } = getPageMeta(path);
  const isHome = path === '/';

  return {
    // The home page has no suffix to append, so bypass the template.
    title: isHome ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url: path,
      title: isHome ? title : `${title} | ${site.titleSuffix}`,
      description,
      siteName: site.name,
      locale: site.locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: isHome ? title : `${title} | ${site.titleSuffix}`,
      description,
      // Next replaces this object wholesale rather than merging it into the
      // root layout's, so `creator` has to be repeated here.
      creator: site.twitterHandle,
    },
  };
};
