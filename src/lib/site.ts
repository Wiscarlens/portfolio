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
  email: 'info@wiscarlens.com',
  city: 'Orlando',
  region: 'FL',
  regionName: 'Florida',
  country: 'US',
  // Profiles that identify the same person elsewhere on the web. Search
  // engines and AI crawlers use these to reconcile the entity.
  sameAs: [
    'https://www.linkedin.com/in/wiscarlens',
    'https://github.com/Wiscarlens',
    'https://x.com/wiscarlens',
    'https://medium.com/@wiscarlens',
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
    'Wiscarlens Lucius is a software engineer in Orlando, FL who turns ideas into production-ready software, from architecture through deployment and growth.',
  locale: 'en_US',
  lang: 'en',
  themeColor: '#131424',
  accentColor: '#F13024',
  twitterHandle: '@wiscarlens',
};

export type Role = {
  role: string;
  org: string;
  /** Display period on the page. Year-level on purpose: month precision
   *  belongs in the structured data, not in a compact portfolio row. */
  period: string;
  /** ISO 8601 start, month precision where known (e.g. '2024-05'). */
  startDate: string;
  /** ISO 8601 end; null while ongoing. */
  endDate: string | null;
};

export type Credential = {
  title: string;
  org: string;
  period: string;
  kind: 'degree' | 'certificate';
};

export type Award = { title: string; org: string; year: string };

/**
 * Résumé data. Lives here rather than in the About page component so the page
 * and the JSON-LD Person graph can't drift apart.
 */
export const experience: Role[] = [
  {
    role: 'Solutions Analyst | Software Engineer',
    org: 'Deloitte',
    period: '2025 – Present',
    startDate: '2025-10',
    endDate: null,
  },
  {
    role: 'Full-stack Developer',
    org: 'Candace Crowe Design',
    period: '2025',
    startDate: '2025-04',
    endDate: '2025-10',
  },
  {
    role: 'Full-stack Developer',
    org: 'Worx LLC',
    period: '2024 – 2025',
    startDate: '2024-05',
    endDate: '2025-03',
  },
  {
    role: 'Android Developer Intern',
    org: 'U.S. Department of Veterans Affairs',
    period: '2023 – 2024',
    startDate: '2023-09',
    endDate: '2024-06',
  },
];

export const credentials: Credential[] = [
  {
    title: 'B.S. Software Engineering',
    org: 'Valencia College',
    period: '2021 – 2024',
    kind: 'degree',
  },
];

export const awards: Award[] = [
  {
    title: '3rd Place, Google Extended I/O Hackathon',
    org: 'Google',
    year: '2024',
  },
];

export type PageMeta = {
  /** Route path, e.g. '/about'. */
  path: string;
  /** Page title. Subpages get ' | J.L Wiscarlens' appended by the title template. */
  title: string;
  description: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  /** One-line description used in public/llms.txt. */
  summary: string;
};

// Every indexable route, with the metadata that describes it. This array
// drives each page's Metadata export, the sitemap, and the llms.txt summary,
// so adding a page in one place keeps all three in sync.
export const pages: PageMeta[] = [
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

/**
 * Absolute URL for a site-relative path. The root resolves to the bare origin
 * with no trailing slash, matching what Next emits for the canonical tag.
 */
export const absoluteUrl = (path = '/'): string =>
  path === '/' ? SITE_URL : `${SITE_URL}${path}`;

/** Bare hostname, e.g. 'wiscarlens.com'. */
export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, '');

/** Look up the metadata entry for a route. Throws on an unknown route so a
 *  missing lib/site.ts entry fails the build instead of shipping a bare page. */
export const getPageMeta = (path: string): PageMeta => {
  const meta = pages.find((p) => p.path === path);
  if (!meta) throw new Error(`No metadata registered for route "${path}" in lib/site.ts`);
  return meta;
};
