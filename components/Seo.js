// Per-page <head> metadata: title, description, canonical, Open Graph,
// Twitter cards, and page-level JSON-LD.

import Head from 'next/head';
import { useRouter } from 'next/router';

import { absoluteUrl, getPageMeta, site } from '../lib/site';
import { pageGraph } from '../lib/structuredData';

/**
 * Drop <Seo /> at the top of a page. With no props it reads the route's
 * metadata from lib/site.js; pass overrides for one-off pages.
 *
 * @param {string}  [title]        Page title (suffix is appended automatically)
 * @param {string}  [description]  Meta description, ~150-160 chars
 * @param {string}  [path]         Route override (defaults to the current route)
 * @param {string}  [schemaType]   schema.org page type, e.g. 'ProfilePage'
 * @param {boolean} [noindex]      Keep the page out of search results
 */
const Seo = ({ title, description, path, schemaType, noindex = false }) => {
  const router = useRouter();
  const route = path ?? router.pathname;
  const meta = getPageMeta(route);

  const rawTitle = title ?? meta?.title ?? site.defaultTitle;
  // The home page title is already the full "Name | Role" string.
  const fullTitle =
    rawTitle === site.defaultTitle
      ? rawTitle
      : `${rawTitle} | ${site.titleSuffix}`;

  const metaDescription = description ?? meta?.description ?? site.description;
  const canonical = absoluteUrl(route);
  const ogImage = `${absoluteUrl('/api/og')}?title=${encodeURIComponent(
    rawTitle === site.defaultTitle ? site.name : rawTitle
  )}`;

  const graph = pageGraph({
    path: route,
    title: rawTitle,
    description: metaDescription,
    type: schemaType ?? (route === '/' || route === '/about' ? 'ProfilePage' : 'WebPage'),
  });

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name='description' content={metaDescription} />
      <link rel='canonical' href={canonical} />

      {noindex ? (
        <meta name='robots' content='noindex, nofollow' />
      ) : (
        <meta
          name='robots'
          content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        />
      )}

      {/* Open Graph — Facebook, LinkedIn, Slack, iMessage */}
      <meta property='og:type' content='website' />
      <meta property='og:site_name' content={site.name} />
      <meta property='og:locale' content={site.locale} />
      <meta property='og:url' content={canonical} />
      <meta property='og:title' content={fullTitle} />
      <meta property='og:description' content={metaDescription} />
      <meta property='og:image' content={ogImage} />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />
      <meta property='og:image:alt' content={`${site.name} — ${rawTitle}`} />

      {/* Twitter / X */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={fullTitle} />
      <meta name='twitter:description' content={metaDescription} />
      <meta name='twitter:image' content={ogImage} />
      {site.twitterHandle && (
        <meta name='twitter:creator' content={site.twitterHandle} />
      )}

      {/* Page-level structured data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
    </Head>
  );
};

export default Seo;
