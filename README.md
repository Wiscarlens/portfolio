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
- `public/` — static assets (avatar, logo, project thumbnails)

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
