// Single source of truth for site-wide SEO metadata.
//
// To move the site to a different domain, set NEXT_PUBLIC_SITE_URL in your
// environment (e.g. Vercel project settings) — nothing else needs to change.

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://wiscarlens.com'
).replace(/\/$/, '');

export const person = {
  // Legal/professional name — this is what LinkedIn and GitHub carry, so it
  // stays the primary name in structured data for entity reconciliation.
  name: 'Wiscarlens Lucius',
  // Display name used for page titles, share cards, and the logo.
  brandName: 'J.L Wiscarlens',
  givenName: 'Wiscarlens',
  familyName: 'Lucius',
  jobTitle: 'Software Engineer',
  email: 'wiscarlens@gmail.com',
  city: 'Orlando',
  region: 'FL',
  regionName: 'Florida',
  country: 'US',
  // Profiles that identify the same person elsewhere on the web. Search
  // engines and AI crawlers use these to reconcile the entity.
  sameAs: [
    'https://www.linkedin.com/in/wiscarlens',
    'https://github.com/Wiscarlens',
  ],
  alumniOf: 'Valencia College',
  worksFor: 'Deloitte',
  knowsAbout: [
    'Full-Stack Web Development',
    'Next.js',
    'React',
    'TypeScript',
    'Node.js',
    'Java',
    'Spring',
    'Kotlin',
    'Android Development',
    'PostgreSQL',
    'Prisma',
    'Docker',
    'REST API Design',
    'Software Architecture',
  ],
};

export const site = {
  name: person.brandName,
  // Appended to subpage titles, e.g. 'About | J.L Wiscarlens'.
  titleSuffix: person.brandName,
  defaultTitle: person.brandName,
  description:
    'Wiscarlens Lucius is a software engineer in Orlando, FL building high-performance, scalable full-stack web platforms, Android apps, and backend integrations — from initial design through deployment.',
  locale: 'en_US',
  lang: 'en',
  themeColor: '#131424',
  accentColor: '#F13024',
  twitterHandle: null, // set to '@handle' once a Twitter/X account exists
};

// Every indexable route, with the metadata that describes it. This array
// drives <Seo>, the sitemap, and the llms.txt summary, so adding a page in
// one place keeps all three in sync.
export const pages = [
  {
    path: '/',
    title: site.defaultTitle,
    description: site.description,
    changefreq: 'monthly',
    priority: 1.0,
    summary:
      'Home — introduction to Wiscarlens Lucius, a software engineer in Orlando, FL focused on data-driven, scalable software.',
  },
  {
    path: '/about',
    title: 'About',
    description:
      'Wiscarlens Lucius has spent 4+ years shipping full-stack web platforms, Android apps, and backend integrations at Deloitte, Candace Crowe Design, Worx LLC, and the U.S. Department of Veterans Affairs.',
    changefreq: 'monthly',
    priority: 0.9,
    summary:
      'About — background, skills (React, Next.js, TypeScript, Java, Spring, Kotlin, PostgreSQL, Docker), work experience, education, and awards.',
  },
  {
    path: '/services',
    title: 'Services',
    description:
      'Full-stack web development, Android mobile development, backend and API engineering, database and DevOps work, and UI/UX implementation — from architecture through deployment.',
    changefreq: 'monthly',
    priority: 0.8,
    summary:
      'Services — full-stack web development, mobile development, backend and API engineering, database and DevOps, and UI/UX implementation.',
  },
  {
    path: '/work',
    title: 'Work',
    description:
      'Selected projects by Wiscarlens Lucius across full-stack web, mobile, and third-party integrations — including sports evaluation platforms, healthcare dashboards, and a VA Android app.',
    changefreq: 'monthly',
    priority: 0.9,
    summary:
      'Work — a portfolio of shipped products and platforms spanning full-stack web apps, Android apps, and Stripe/Slack integrations.',
  },
  {
    path: '/testimonials',
    title: 'Testimonials',
    description:
      'What clients and collaborators say about working with Wiscarlens Lucius on software engineering projects.',
    changefreq: 'yearly',
    priority: 0.6,
    summary:
      'Testimonials — feedback from clients and collaborators.',
  },
  {
    path: '/contact',
    title: 'Contact',
    description:
      'Get in touch with Wiscarlens Lucius about software engineering work, freelance projects, or full-time roles in Orlando, FL and remote.',
    changefreq: 'yearly',
    priority: 0.7,
    summary:
      'Contact — reach Wiscarlens Lucius by email or through the contact form.',
  },
];

/** Absolute URL for a site-relative path. */
export const absoluteUrl = (path = '/') => `${SITE_URL}${path}`;

/** Look up the metadata entry for a route. */
export const getPageMeta = (path) => pages.find((p) => p.path === path);
