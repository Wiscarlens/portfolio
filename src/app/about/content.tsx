'use client';

import React, { useState } from 'react';
import type { ReactNode } from 'react';

// icons
import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaNodeJs,
  FaJava,
  FaDocker,
  FaAndroid,
} from 'react-icons/fa';

import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPrisma,
  SiPostgresql,
  SiKotlin,
  SiSpring,
  SiNginx,
  SiVercel,
} from 'react-icons/si';

type Tech = { name: string; icon: ReactNode };
type SkillGroup = { label: string; tech: Tech[] };

/** A dated row on the timeline. `org` and `note` are optional so an award,
 *  which has neither an employer nor a tenure, uses the same component. */
type TimelineEntry = {
  title: string;
  org?: string;
  period: string;
  /** Currently held — marker is filled with the accent colour. */
  current?: boolean;
  /** Not a job. Rendered with a diamond marker instead of a dot. */
  milestone?: boolean;
};

type AboutSection =
  | { title: string; kind: 'skills'; groups: SkillGroup[] }
  | { title: string; kind: 'timeline'; entries: TimelineEntry[] };

// Skills carry JSX icons, so they stay here. Everything dated comes from
// lib/site.ts, which also feeds the JSON-LD Person graph — one source of
// truth, so the page and the structured data can't disagree.
const skills: AboutSection = {
  title: 'skills',
  kind: 'skills',
  groups: [
    {
      label: 'Frontend',
      tech: [
        { name: 'React', icon: <FaReact /> },
        { name: 'Next.js', icon: <SiNextdotjs /> },
        { name: 'TypeScript', icon: <SiTypescript /> },
        { name: 'JavaScript', icon: <FaJs /> },
        { name: 'HTML5', icon: <FaHtml5 /> },
        { name: 'CSS3', icon: <FaCss3 /> },
        { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
      ],
    },
    {
      label: 'Backend & Data',
      tech: [
        { name: 'Node.js', icon: <FaNodeJs /> },
        { name: 'Java', icon: <FaJava /> },
        { name: 'Spring', icon: <SiSpring /> },
        { name: 'Prisma', icon: <SiPrisma /> },
        { name: 'PostgreSQL', icon: <SiPostgresql /> },
      ],
    },
    {
      label: 'Mobile & DevOps',
      tech: [
        { name: 'Android', icon: <FaAndroid /> },
        { name: 'Kotlin', icon: <SiKotlin /> },
        { name: 'Docker', icon: <FaDocker /> },
        { name: 'NGINX', icon: <SiNginx /> },
        { name: 'Vercel', icon: <SiVercel /> },
      ],
    },
  ],
};

export const aboutData: AboutSection[] = [
  skills,
  {
    title: 'experience',
    kind: 'timeline',
    entries: [
      ...experience.map((e) => ({
        title: e.role,
        org: e.org,
        period: e.period,
        current: e.endDate === null,
      })),
      // The hackathon placement sits in the timeline rather than in a tab of
      // its own: one row under an "awards" heading reads as scarcity, the
      // same row among the jobs reads as something that happened.
      ...awards.map((a) => ({
        title: a.title,
        period: a.year,
        milestone: true,
      })),
    ],
  },
  {
    title: 'education',
    kind: 'timeline',
    entries: credentials.map((c) => ({
      title: c.title,
      org: c.org,
      period: c.period,
    })),
  },
];

// data
import { awards, credentials, experience } from '../../lib/site';

// components
import Avatar from '../../components/Avatar';
import Circles from '../../components/Circles';

// framer motion
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

// counter
import CountUp from 'react-countup';


const AboutContent = () => {
  const [index, setIndex] = useState(0);
  return (
    <div className='min-h-screen xl:h-full bg-primary/30 pt-36 pb-28 xl:py-32 text-center xl:text-left'>
      <Circles />
      {/* avatar img */}
      <motion.div
        variants={fadeIn('right', 0.2)}
        initial='hidden'
        animate='show'
        exit='hidden'
        className='hidden xl:flex absolute bottom-0 -left-[280px]'
      >
        <Avatar />
      </motion.div>
      <div className='container mx-auto xl:h-full flex flex-col items-center xl:flex-row gap-x-6'>
        {/* text */}
        <div className='flex-1 flex flex-col justify-center'>
          <motion.h1
            variants={fadeIn('right', 0.2)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='h2'
          >
            Every decision has a{' '}
            <span className='text-accent'>reason behind it.</span>
          </motion.h1>
          <motion.p
            variants={fadeIn('right', 0.4)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='max-w-[500px] mx-auto xl:mx-0 mb-6 xl:mb-12 px-2 xl:px-0'
          >
            Architecture, tooling, interface choices: I make them from
            research and what&apos;s proven to work, not from preference or
            novelty. Complexity has to earn its place. The result is fewer
            rewrites, systems that stay maintainable as they grow, and
            software shaped around what the business actually needs.
          </motion.p>
          {/* counters */}
          <motion.div
            variants={fadeIn('right', 0.6)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='hidden md:flex md:max-w-xl xl:max-w-none mx-auto xl:mx-0 mb-8'
          >
            <div className='flex flex-1 xl:gap-x-6'>
              {/* experience */}
              <div className='relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0'>
                <div className='text-2xl xl:text-4xl font-extrabold text-accent mb-2'>
                  <CountUp start={0} end={5} duration={5} /> +
                </div>
                <div className='text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]'>
                  Years of experience
                </div>
              </div>
              {/* companies */}
              <div className='relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0'>
                <div className='text-2xl xl:text-4xl font-extrabold text-accent mb-2'>
                  <CountUp start={0} end={5} duration={5} /> +
                </div>
                <div className='text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]'>
                  Companies worked at
                </div>
              </div>
              {/* projects */}
              <div className='relative flex-1'>
                <div className='text-2xl xl:text-4xl font-extrabold text-accent mb-2'>
                  <CountUp start={0} end={10} duration={5} /> +
                </div>
                <div className='text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]'>
                  Projects shipped
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        {/* info */}
        <motion.div
          variants={fadeIn('left', 0.4)}
          initial='hidden'
          animate='show'
          exit='hidden'
          className='flex flex-col w-full xl:max-w-[48%] h-[480px]'
        >
          {/* Tabs are real buttons with the ARIA tab pattern: the previous
              divs weren't focusable, so keyboard users could only ever see
              the first panel. */}
          <div
            role='tablist'
            aria-label='About Wiscarlens'
            className='flex gap-x-4 xl:gap-x-8 mx-auto xl:mx-0 mb-4'
          >
            {aboutData.map((item, itemIndex) => {
              const selected = index === itemIndex;
              return (
                <button
                  key={item.title}
                  type='button'
                  role='tab'
                  id={`about-tab-${item.title}`}
                  aria-selected={selected}
                  aria-controls={`about-panel-${item.title}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setIndex(itemIndex)}
                  onKeyDown={(event) => {
                    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
                    event.preventDefault();
                    const next =
                      event.key === 'ArrowRight'
                        ? (itemIndex + 1) % aboutData.length
                        : (itemIndex - 1 + aboutData.length) % aboutData.length;
                    setIndex(next);
                    document.getElementById(`about-tab-${aboutData[next].title}`)?.focus();
                  }}
                  className={`${
                    selected &&
                    'text-accent after:w-[100%] after:bg-accent after:transition-all after:duration-300'
                  }  cursor-pointer capitalize xl:text-lg relative after:w-8 after:h-[2px] after:bg-white after:absolute after:-bottom-1 after:left-0`}
                >
                  {item.title}
                </button>
              );
            })}
          </div>
          {/* Every panel is rendered; inactive ones are hidden with CSS rather
              than left out of the tree. Crawlers and AI readers don't click
              tabs, so the work history and credentials have to be in the HTML. */}
          {aboutData.map((section, sectionIndex) => (
            <div
              key={section.title}
              role='tabpanel'
              id={`about-panel-${section.title}`}
              aria-labelledby={`about-tab-${section.title}`}
              className={`${
                index === sectionIndex ? 'block' : 'hidden'
              } py-2 xl:py-6 text-left`}
            >
              {section.kind === 'skills' ? (
                <div className='mx-auto xl:mx-0 max-w-[420px] xl:max-w-none flex flex-col gap-y-5'>
                  {section.groups.map((group) => (
                    <div key={group.label}>
                      <div className='text-[11px] uppercase tracking-[2px] text-white/40 mb-2'>
                        {group.label}
                      </div>
                      <div className='flex flex-wrap gap-x-4 gap-y-3'>
                        {group.tech.map((tech) => (
                          <span
                            key={tech.name}
                            title={tech.name}
                            role='img'
                            aria-label={tech.name}
                            className='text-2xl text-white/70 hover:text-accent transition-colors duration-200'
                          >
                            {tech.icon}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* A rail with markers carries the sequence, so the rows need
                   no separator punctuation. Role, employer and period sit at
                   three type weights instead of being joined by dashes. */
                <ol className='relative mx-auto xl:mx-0 max-w-[420px] xl:max-w-none flex flex-col gap-y-5'>
                  <span
                    aria-hidden='true'
                    className='absolute left-[3px] top-2 bottom-2 w-px bg-white/10'
                  />
                  {section.entries.map((entry) => (
                    <li
                      key={`${entry.title}-${entry.period}`}
                      className='relative pl-6 flex items-baseline justify-between gap-x-4'
                    >
                      <span
                        aria-hidden='true'
                        className={`absolute left-0 top-[7px] h-[7px] w-[7px] ${
                          entry.milestone ? 'rotate-45' : 'rounded-full'
                        } ${
                          entry.current
                            ? 'bg-accent shadow-[0_0_0_3px_rgba(241,48,36,0.18)]'
                            : entry.milestone
                              ? 'border border-accent/60'
                              : 'bg-white/25'
                        }`}
                      />
                      <span className='min-w-0'>
                        <span className='block text-[15px] leading-snug text-white/90'>
                          {entry.title}
                        </span>
                        {entry.org && (
                          <span className='block text-[13px] leading-snug text-white/40'>
                            {entry.org}
                          </span>
                        )}
                      </span>
                      <span className='shrink-0 font-mono text-[11px] tracking-tight text-white/35 tabular-nums'>
                        {entry.period}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AboutContent;
