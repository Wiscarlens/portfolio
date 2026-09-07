'use client';

// components
import Capabilities from '../../components/Capabilities';
import Bulb from '../../components/Bulb';
import Circles from '../../components/Circles';

// framer motion
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';


const ServicesContent = () => {
  return (
    <div className='min-h-screen xl:h-full bg-primary/30 pt-36 pb-28 xl:py-36 flex items-start xl:items-center'>
      <Circles />
      <div className='container mx-auto'>
        <div className='flex flex-col xl:flex-row gap-x-8'>
          {/* text */}
          <div className='text-center flex xl:w-[30vw] flex-col lg:text-left mb-4 xl:mb-0'>
            <motion.h1
              variants={fadeIn('up', 0.2)}
              initial='hidden'
              animate='show'
              exit='hidden'
              className='h2 xl:mt-8'
            >
              What I do <span className='text-accent'>.</span>
            </motion.h1>
            <motion.p
              variants={fadeIn('up', 0.4)}
              initial='hidden'
              animate='show'
              exit='hidden'
              className='mb-4 max-w-[400px] mx-auto lg:mx-0'
            >
              What I bring to a team, from first architecture decision
              through deployment and the work that follows.
            </motion.p>
          </div>

          {/* Capability grid. Was a Swiper carousel, which hid three of six
              entries behind a swipe and shipped ~88KB of JS to do it. A grid
              shows everything at once and costs nothing. */}
          <div className='w-full xl:max-w-[65%]'>
            <Capabilities />
          </div>
        </div>
      </div>
      <Bulb />
    </div>
  );
};

export default ServicesContent;
