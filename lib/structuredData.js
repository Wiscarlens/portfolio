// JSON-LD builders. Schema.org structured data is what lets Google show rich
// results and what gives AI crawlers an unambiguous, machine-readable version
// of the page instead of making them infer it from markup.

import { SITE_URL, absoluteUrl, person, site } from './site';

// Stable @ids so the graph nodes can reference each other across pages.
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const personSchema = () => ({
  '@type': 'Person',
  '@id': PERSON_ID,
  name: person.name,
  alternateName: person.brandName,
  givenName: person.givenName,
  familyName: person.familyName,
  jobTitle: person.jobTitle,
  description: site.description,
  url: SITE_URL,
  email: `mailto:${person.email}`,
  image: absoluteUrl('/avatar.png'),
  address: {
    '@type': 'PostalAddress',
    addressLocality: person.city,
    addressRegion: person.region,
    addressCountry: person.country,
  },
  worksFor: { '@type': 'Organization', name: person.worksFor },
  alumniOf: { '@type': 'CollegeOrUniversity', name: person.alumniOf },
  knowsAbout: person.knowsAbout,
  sameAs: person.sameAs,
});

export const webSiteSchema = () => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_URL,
  name: site.name,
  description: site.description,
  inLanguage: site.lang,
  publisher: { '@id': PERSON_ID },
  copyrightHolder: { '@id': PERSON_ID },
});

/**
 * The site-wide graph, rendered once per page. Person + WebSite are the two
 * entities every page inherits.
 */
export const siteGraph = () => ({
  '@context': 'https://schema.org',
  '@graph': [personSchema(), webSiteSchema()],
});

export const breadcrumbSchema = (path, title) => {
  const items = [
    { name: 'Home', item: SITE_URL },
    ...(path === '/' ? [] : [{ name: title, item: absoluteUrl(path) }]),
  ];
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((entry, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: entry.name,
      item: entry.item,
    })),
  };
};

/**
 * Per-page graph: the page itself, plus its breadcrumb trail. The home and
 * about pages are ProfilePage (they are *about* the person), which is the
 * type Google looks for on personal sites.
 */
export const pageGraph = ({ path, title, description, type = 'WebPage' }) => {
  const url = absoluteUrl(path);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': type,
        '@id': `${url}#page`,
        url,
        name: title,
        description,
        inLanguage: site.lang,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': PERSON_ID },
        ...(type === 'ProfilePage' ? { mainEntity: { '@id': PERSON_ID } } : {}),
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      { ...breadcrumbSchema(path, title), '@id': `${url}#breadcrumb` },
    ],
  };
};
