// Dynamic sitemap. Routes come from lib/site.js, so adding a page there is
// enough to get it into the sitemap.

import { absoluteUrl, pages } from '../lib/site';

const buildSitemap = (lastmod) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${absoluteUrl(page.path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority.toFixed(1)}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

export const getServerSideProps = async ({ res }) => {
  const lastmod = new Date().toISOString().split('T')[0];

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate'
  );
  res.write(buildSitemap(lastmod));
  res.end();

  return { props: {} };
};

// Never rendered — getServerSideProps writes the response directly.
export default function Sitemap() {
  return null;
}
