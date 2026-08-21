// Custom document — sets the document language (required for accessibility
// and for search engines to pick the right index) and links icons/manifest.

import { Html, Head, Main, NextScript } from 'next/document';

import { site } from '../lib/site';

export default function Document() {
  return (
    <Html lang={site.lang}>
      <Head>
        {/* Icons */}
        <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
        <link rel='manifest' href='/site.webmanifest' />

        {/* Browser chrome */}
        <meta name='theme-color' content={site.themeColor} />
        <meta name='color-scheme' content='dark' />

        {/* Author + geo hints */}
        <meta name='author' content={site.name} />

        {/* Google Search Console: paste the token into NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION */}
        {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
          <meta
            name='google-site-verification'
            content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
          />
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
