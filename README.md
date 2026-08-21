# Wiscarlens Lucius — Portfolio

Personal portfolio site for Wiscarlens Lucius (J.L Wiscarlens), a software
engineer based in Orlando, FL. Built with Next.js (App Router), TypeScript,
Tailwind CSS, Framer Motion, and Swiper.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Scripts

- `npm run dev` — start the development server
- `npm run build` — build for production
- `npm start` — serve the production build
- `npm run lint` — run ESLint
- `npm run typecheck` — run `tsc --noEmit`

## Project Structure

- `app/` — routes and metadata (App Router)
- `components/` — shared UI (Header, Nav, Logo, Socials, sliders)
- `lib/` — site metadata, JSON-LD builders, share-image renderer
- `public/` — static assets (avatar, project thumbnails, `llms.txt`)

Each route is a server component that exports `metadata` and renders a
client `content.tsx` sibling. The split exists because Framer Motion, Swiper,
and the particles background all need browser APIs — the server half stays
free to export metadata, which a client component cannot do.

## SEO & AI Discoverability

All site-wide metadata lives in one file: **`lib/site.ts`**. Editing the
`pages` array there updates page titles, meta descriptions, canonicals, and
the sitemap together — they can't drift apart.

| Route | Source |
| --- | --- |
| `/sitemap.xml` | `app/sitemap.ts` |
| `/robots.txt` | `app/robots.ts` |
| `/manifest.webmanifest` | `app/manifest.ts` |
| `/icon.svg` | `app/icon.svg` |
| `/opengraph-image` | `app/opengraph-image.tsx` (per-section overrides in each segment) |
| `/llms.txt` | `public/llms.txt` — plain-text summary for AI assistants |

Titles, descriptions, canonicals, and Open Graph/Twitter tags come from each
route's `metadata` export, built by `lib/metadata.ts`. The root layout sets
`metadataBase` and the `%s | J.L Wiscarlens` title template.

Next.js has no built-in structured-data API, so JSON-LD stays a hand-rolled
`<script>` via `components/JsonLd.tsx`: the root layout emits a site-wide
`Person` + `WebSite` graph, and each page adds `ProfilePage`/`WebPage` plus
`BreadcrumbList`.

### Changing the domain

Set `NEXT_PUBLIC_SITE_URL` (e.g. in Vercel project settings). Everything —
canonicals, sitemap, robots, share images — follows from it. The fallback is
`https://wiscarlens.com`.

### Adding a page

1. Create `app/<route>/page.tsx` and a `content.tsx` client sibling.
2. Add an entry to the `pages` array in `lib/site.ts`.
3. `export const metadata = pageMetadata('/<route>')` in `page.tsx`.

It's then in the sitemap automatically. Add a matching line to
`public/llms.txt` so AI crawlers see it too. `getPageMeta` throws on an
unregistered route, so a missed step fails the build rather than shipping a
page with no metadata.

### After deploying

- Verify the domain in [Google Search Console](https://search.google.com/search-console)
  and submit `https://wiscarlens.com/sitemap.xml`. For meta-tag verification,
  set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
- Do the same in [Bing Webmaster Tools](https://www.bing.com/webmasters).
- Check link previews with the
  [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
  and [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).
- Validate structured data at [validator.schema.org](https://validator.schema.org/).

## Content Updates

Most personal content lives in typed data arrays so it can be edited without
touching markup:

- `app/about/content.tsx` — `aboutData` (skills, awards, experience, credentials)
- `components/ServiceSlider.tsx` — `serviceData`
- `components/WorkSlider.tsx` — `workSlider.slides`
- `components/TestimonialSlider.tsx` — `testimonialSlider`
- `components/Socials.tsx` — social links
- `components/Logo.tsx` — the `~/j.l.wiscarlens` wordmark

Swap images in `public/` (keep the same filenames) to update the avatar,
project thumbnails, or testimonial avatars without code changes.
