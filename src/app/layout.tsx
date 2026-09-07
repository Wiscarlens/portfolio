import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Sora } from 'next/font/google';
import type { ReactNode } from 'react';

import '../styles/globals.css';

// components
import Header from '../components/Header';
import JsonLd from '../components/JsonLd';
import Nav from '../components/Nav';
import TopLeftImg from '../components/TopLeftImg';

// metadata
import { SITE_URL, person, site } from '../lib/site';
import { siteGraph } from '../lib/structuredData';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
});

// Loaded here rather than inside Logo so the wordmark and the dated rows in
// About share one font instance instead of requesting it twice.
const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
});

// Defaults every route inherits. Individual pages override title,
// description, canonical, and og/twitter via lib/metadata.ts.
export const metadata: Metadata = {
  // Makes every relative URL below (canonical, og:url, og:image) resolve to
  // an absolute one. Without it Next warns and emits relative og tags, which
  // most crawlers reject.
  metadataBase: new URL(SITE_URL),
  title: {
    default: site.defaultTitle,
    template: `%s | ${site.titleSuffix}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: person.name, url: SITE_URL }],
  creator: person.name,
  publisher: person.name,
  keywords: person.knowsAbout,
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: site.locale,
    url: '/',
    title: site.defaultTitle,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: site.defaultTitle,
    description: site.description,
    creator: site.twitterHandle,
  },
  // Next serves the manifest from app/manifest.ts at this path.
  manifest: '/manifest.webmanifest',
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={site.lang}>
      <body
        className={`page bg-site text-white bg-cover bg-no-repeat ${sora.variable} ${mono.variable} font-sora relative`}
      >
        {/* Site-wide entity graph (Person + WebSite), on every page. */}
        <JsonLd graph={siteGraph()} />
        <TopLeftImg />
        <Nav />
        <Header />
        {/* app/template.tsx wraps children with the route-change animation. */}
        <main className='min-h-screen xl:h-full'>{children}</main>
      </body>
    </html>
  );
}
