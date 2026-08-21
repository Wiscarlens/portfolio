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

type AboutInfo = {
  title: string;
  /** Date range or qualifier, e.g. '2025 – Present'. Absent on skill rows. */
  stage?: string;
  /** Technology icons. Only present on skill rows. */
  icons?: ReactNode[];
};

type AboutSection = { title: string; info: AboutInfo[] };

//  about data
export const aboutData: AboutSection[] = [
  {
    title: 'skills',
    info: [
      {
        title: 'Frontend',
        icons: [
          <FaReact key='react' />,
          <SiNextdotjs key='nextjs' />,
          <SiTypescript key='ts' />,
          <FaJs key='js' />,
          <FaHtml5 key='html5' />,
          <FaCss3 key='css3' />,
          <SiTailwindcss key='tailwind' />,
        ],
      },
      {
        title: 'Backend & Data',
        icons: [
          <FaNodeJs key='node' />,
          <FaJava key='java' />,
          <SiSpring key='spring' />,
          <SiPrisma key='prisma' />,
          <SiPostgresql key='postgres' />,
        ],
      },
      {
        title: 'Mobile & DevOps',
        icons: [
          <FaAndroid key='android' />,
          <SiKotlin key='kotlin' />,
          <FaDocker key='docker' />,
          <SiNginx key='nginx' />,
          <SiVercel key='vercel' />,
        ],
      },
    ],
  },
  {
    title: 'awards',
    info: [
      {
        title: '3rd Place — Google Extended I/O Hackathon',
        stage: '2024',
      },
    ],
  },
  {
    title: 'experience',
    info: [
      {
        title: 'Solutions Analyst | Software Engineer — Deloitte',
        stage: '2025 – Present',
      },
      {
        title: 'Full-stack Developer — Candace Crowe Design',
        stage: '2025',
      },
      {
        title: 'Full-stack Developer — Worx LLC',
        stage: '2024 – 2025',
      },
      {
        title: 'Android Developer — U.S. Department of Veterans Affairs',
        stage: '2023 – 2024',
      },
    ],
  },
  {
    title: 'credentials',
    info: [
      {
        title: 'B.S. Computer Science — Valencia College',
        stage: '2021 – 2024',
      },
      {
        title: 'A.A. Computer Science — Valencia College',
        stage: '2018 – 2020',
      },
      {
        title: 'React.js Essential Training — LinkedIn Learning',
        stage: 'Cert.',
      },
      {
        title: 'Programming with JavaScript — Meta',
        stage: 'Cert.',
      },
    ],
  },
];

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
  console.log(index);
  return (
    <div className='h-full bg-primary/30 py-32 text-center xl:text-left'>
      <Circles />
      {/* avatar img */}
      <motion.div
        variants={fadeIn('right', 0.2)}
        initial='hidden'
        animate='show'
        exit='hidden'
        className='hidden xl:flex absolute bottom-0 -left-[370px]'
      >
        <Avatar />
      </motion.div>
      <div className='container mx-auto h-full flex flex-col items-center xl:flex-row gap-x-6'>
        {/* text */}
        <div className='flex-1 flex flex-col justify-center'>
          <motion.h1
            variants={fadeIn('right', 0.2)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='h2'
          >
            Engineering ideas into <span className='text-accent'>scalable</span>{' '}
            production software.
          </motion.h1>
          <motion.p
            variants={fadeIn('right', 0.4)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='max-w-[500px] mx-auto xl:mx-0 mb-6 xl:mb-12 px-2 xl:px-0'
          >
            Over the past 4 years I&apos;ve shipped full-stack web platforms,
            Android apps, and backend integrations across Deloitte, Candace
            Crowe Design, Worx LLC, and the U.S. Department of Veterans
            Affairs. I hold a B.S. in Computer Science from Valencia College
            and love turning ambiguous business problems into clean,
            well-architected software.
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
                  <CountUp start={0} end={4} duration={5} /> +
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
              <div className='relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0'>
                <div className='text-2xl xl:text-4xl font-extrabold text-accent mb-2'>
                  <CountUp start={0} end={10} duration={5} /> +
                </div>
                <div className='text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]'>
                  Projects shipped
                </div>
              </div>
              {/* awards */}
              <div className='relative flex-1'>
                <div className='text-2xl xl:text-4xl font-extrabold text-accent mb-2'>
                  <CountUp start={0} end={1} duration={5} />
                </div>
                <div className='text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]'>
                  Hackathon award
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
          <div className='flex gap-x-4 xl:gap-x-8 mx-auto xl:mx-0 mb-4'>
            {aboutData.map((item, itemIndex) => {
              return (
                <div
                  key={itemIndex}
                  className={`${
                    index === itemIndex &&
                    'text-accent after:w-[100%] after:bg-accent after:transition-all after:duration-300'
                  }  cursor-pointer capitalize xl:text-lg relative after:w-8 after:h-[2px] after:bg-white after:absolute after:-bottom-1 after:left-0`}
                  onClick={() => setIndex(itemIndex)}
                >
                  {item.title}
                </div>
              );
            })}
          </div>
          <div className='py-2 xl:py-6 flex flex-col gap-y-2 xl:gap-y-4 items-center xl:items-start'>
            {aboutData[index].info.map((item, itemIndex) => {
              return (
                <div
                  key={itemIndex}
                  className='flex-1 flex flex-col md:flex-row max-w-max gap-x-2 items-center text-white/60'
                >
                  {/* title */}
                  <div className='font-light mb-2 md:mb-0'>{item.title}</div>
                  <div className='hidden md:flex'>-</div>
                  <div>{item.stage}</div>
                  <div className='flex gap-x-4'>
                    {/* icons */}
                    {item.icons?.map((icon, iconIndex) => {
                      return (
                        <div key={iconIndex} className='text-2xl text-white'>
                          {icon}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutContent;
