# Wiscarlens Lucius — Portfolio

Personal portfolio site for Wiscarlens Lucius, a software engineer based in
Orlando, FL. Built with Next.js, Tailwind CSS, Framer Motion, and Swiper.

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

## Project Structure

- `pages/` — routes (home, about, services, work, testimonials, contact)
- `components/` — shared UI (Header, Nav, Socials, Sliders, etc.)
- `public/` — static assets (avatar, logo, project thumbnails, `llms.txt`)
- `lib/` — site metadata and JSON-LD builders (see SEO below)

## SEO & AI Discoverability

All site-wide metadata lives in one file: **`lib/site.js`**. Editing the
`pages` array there updates page titles, meta descriptions, the sitemap, and
the canonical URLs together — they can't drift apart.

| Route | What it does |
| --- | --- |
| `/sitemap.xml` | Generated from `lib/site.js` (`pages/sitemap.xml.js`) |
| `/robots.txt` | Generated, points at the sitemap (`pages/robots.txt.js`) |
| `/llms.txt` | Plain-text site summary for AI assistants (`public/llms.txt`) |
| `/api/og` | Generates the 1200x630 social share image on demand |

Per page, `<Seo />` (in `components/Seo.js`) emits the title, meta
description, canonical link, robots directives, Open Graph and Twitter card
tags, and page-level JSON-LD. `pages/_app.js` adds the site-wide
`Person` + `WebSite` graph on every page.

### Changing the domain

Set `NEXT_PUBLIC_SITE_URL` (e.g. in Vercel project settings). Everything —
canonicals, sitemap, robots, OG image URLs — follows from it. The fallback is
`https://wiscarlens.com`.

### Adding a page

1. Create the route under `pages/`.
2. Add an entry to the `pages` array in `lib/site.js`.
3. Render `<Seo />` as the first child of the page's outer element.

It's then in the sitemap automatically. Add a matching line to
`public/llms.txt` so AI crawlers see it too.

### After deploying

- Verify the domain in [Google Search Console](https://search.google.com/search-console)
  and submit `https://wiscarlens.com/sitemap.xml`. To use the meta-tag
  verification method, set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
- Do the same in [Bing Webmaster Tools](https://www.bing.com/webmasters).
- Check link previews with the
  [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
  and [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).
- Validate structured data at
  [validator.schema.org](https://validator.schema.org/).

## Content Updates

Most personal content lives in data arrays so it can be edited without
touching markup:

- `pages/about/index.js` — `aboutData` (skills, awards, experience, credentials)
- `components/ServiceSlider.js` — `serviceData`
- `components/WorkSlider.js` — `workSlider.slides`
- `components/TestimonialSlider.js` — `testimonialSlider`
- `components/Socials.js` — social links

Swap images in `public/` (keep the same filenames) to update the avatar,
logo, project thumbnails, or testimonial avatars without code changes.
