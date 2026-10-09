'use client';

// framer motion
import { motion } from 'framer-motion';

// components
import ParticlesContainer from '../components/ParticlesContainer';
import ProjectsBtn from '../components/ProjectsBtn';

// variants
import { fadeIn } from '../variants';

const HomeContent = () => {
  return (
    <div className='bg-primary/60 min-h-screen xl:h-full'>
      {/* text */}
      <div className='w-full min-h-screen xl:h-full bg-gradient-to-r from-primary/10 via-black/30 to-black/10'>
        <div className='page-shell text-center flex flex-col justify-start xl:justify-center xl:pt-40 xl:text-left min-h-screen xl:h-full container mx-auto'>
          {/* tagline */}
          <motion.div
            variants={fadeIn('down', 0.1)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='text-accent uppercase tracking-[3px] text-xs xl:text-sm mb-4'
          >
            From Hello World to Hello Revenue
          </motion.div>
          {/* title */}
          <motion.h1
            variants={fadeIn('down', 0.2)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='h1'
          >
            I turn ideas into <br />{' '}
            <span className='text-accent'>production-ready software.</span>
          </motion.h1>
          {/* subtitle */}
          <motion.p
            variants={fadeIn('down', 0.3)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16'
          >
            I&apos;m a software engineer in Orlando, FL, and I take ownership
            of the whole journey: architecture, development, deployment, and
            growth. Whether it&apos;s a SaaS platform, internal business
            software, or a new product idea, the goal stays the same. Ship
            software people use and businesses benefit from.
          </motion.p>
          {/* btn */}
          <div className='flex justify-center xl:hidden relative'>
            <ProjectsBtn />
          </div>
          <motion.div
            variants={fadeIn('down', 0.4)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='hidden xl:flex'
          >
            <ProjectsBtn />
          </motion.div>
        </div>
      </div>
      {/* image */}
      <div className='w-[1200px] h-full absolute right-0 bottom-0'>
        {/* bg img */}
        <div className='bg-none xl:bg-explosion xl:bg-cover xl:bg-right xl:bg-no-repeat w-full h-full absolute mix-blend-color-dodge translate-z-0'></div>
        {/* particles */}
        <ParticlesContainer />
      </div>
    </div>
  );
};

export default HomeContent;
