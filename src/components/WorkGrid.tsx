'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

type Project = {
  title: string;
  /** Year shipped. Shown as mono metadata. */
  year: string;
  /** The stack, concretely. Reads better than an adjective. */
  stack: string[];
  /** Screenshot. Rendered as a treated texture layer, not the subject. */
  image: string;
  /** Repo or live URL. When present the whole card becomes a link. */
  href?: string;
};

// TODO: swap /thumb*.jpg for real screenshots, and add href once these have
// public repos or live URLs.
export const projects: Project[] = [
  {
    title: 'Sports Player Evaluation Platform',
    year: '2024',
    stack: ['Next.js', 'PostgreSQL', 'Stripe'],
    image: '/thumb1.jpg',
  },
  {
    title: 'Player Injury Tracking Dashboard',
    year: '2024',
    stack: ['Next.js', 'Prisma', 'PostgreSQL'],
    image: '/thumb2.jpg',
  },
  {
    title: 'Candace Crowe Practice Platform',
    year: '2025',
    stack: ['Next.js', 'Clerk', 'Prisma', 'EMR API'],
    image: '/thumb3.jpg',
  },
  {
    title: 'VA Android App',
    year: '2023',
    stack: ['Kotlin', 'Jetpack Compose'],
    image: '/thumb4.jpg',
  },
  {
    title: 'Slack & Email Notification System',
    year: '2024',
    stack: ['Node.js', 'Slack API'],
    image: '/thumb2.jpg',
  },
  {
    title: 'Stripe Billing Integration',
    year: '2024',
    stack: ['Stripe', 'Webhooks', 'Next.js'],
    image: '/thumb3.jpg',
  },
];

/** HUD corner bracket. Four of these frame each card and extend on hover. */
const Bracket = ({ at }: { at: 'tl' | 'tr' | 'bl' | 'br' }) => {
  const edge = {
    tl: 'top-0 left-0 border-t border-l',
    tr: 'top-0 right-0 border-t border-r',
    bl: 'bottom-0 left-0 border-b border-l',
    br: 'bottom-0 right-0 border-b border-r',
  }[at];
  return (
    <span
      aria-hidden='true'
      className={`pointer-events-none absolute ${edge} h-2.5 w-2.5 border-white/25 transition-all duration-300 group-hover:h-4 group-hover:w-4 group-hover:border-accent`}
    />
  );
};

const Card = ({ project, i }: { project: Project; i: number }) => (
  <>
    {/* Texture layer: desaturated and dimmed so the card reads as type
        first. Keeps duplicate placeholder screenshots from dominating. */}
    <Image
      src={project.image}
      alt=''
      fill
      sizes='(max-width: 640px) 100vw, 380px'
      className='object-cover grayscale opacity-[0.13] transition-all duration-500 group-hover:opacity-[0.28] group-hover:grayscale-0 group-hover:scale-105'
    />
    <span
      aria-hidden='true'
      className='absolute inset-0 bg-gradient-to-tr from-primary via-primary/85 to-transparent'
    />
    {/* Scanlines. 3px pitch, barely visible, gives the surface a screen feel. */}
    <span
      aria-hidden='true'
      className='absolute inset-0 opacity-[0.35] [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.045)_0px,rgba(255,255,255,0.045)_1px,transparent_1px,transparent_3px)]'
    />
    <Bracket at='tl' />
    <Bracket at='tr' />
    <Bracket at='bl' />
    <Bracket at='br' />

    <div className='relative flex h-full flex-col justify-between p-4'>
      <div className='flex items-center justify-between font-mono text-[10px] tracking-[2px] tabular-nums'>
        <span className='text-white/30 transition-colors duration-300 group-hover:text-accent'>
          {String(i + 1).padStart(2, '0')}
        </span>
        <span className='text-white/25'>{project.year}</span>
      </div>
      <div>
        <h3 className='mb-1.5 text-[14px] leading-snug text-white/90'>
          {project.title}
        </h3>
        <p className='font-mono text-[10px] leading-relaxed text-white/30'>
          {project.stack.join('  ·  ')}
        </p>
      </div>
    </div>
  </>
);

const WorkGrid = () => (
  <ol className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
    {projects.map((project, i) => {
      const shell =
        // Square corners on purpose: the corner brackets are single-sided borders,
        // and a square bracket sitting on a rounded corner reads as a mistake.
        'group relative block h-[128px] overflow-hidden border border-white/[0.07] bg-primary/40 transition-colors duration-300 hover:border-accent/30';
      return (
        <motion.li
          key={project.title}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 + i * 0.07, ease: 'easeOut' }}
        >
          {project.href ? (
            <Link href={project.href} className={shell}>
              <Card project={project} i={i} />
            </Link>
          ) : (
            // No link yet, so no anchor: an arrow that goes nowhere is worse
            // than no arrow. The card becomes clickable the moment href exists.
            <div className={shell}>
              <Card project={project} i={i} />
            </div>
          )}
        </motion.li>
      );
    })}
  </ol>
);

export default WorkGrid;
