'use client';

// components
import TestimonialSlider from '../../components/TestimonialSlider';

// framer motion
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';


const TestimonialsContent = () => {
  return (
    <div className='min-h-screen xl:h-full bg-primary/30 pt-36 pb-28 xl:py-32 text-center'>
      <div className='container mx-auto xl:h-full flex flex-col justify-start xl:justify-center'>
        {/* title */}
        <motion.h1
          variants={fadeIn('up', 0.2)}
          initial='hidden'
          animate='show'
          exit='hidden'
          className='h2 mb-8 xl:mb-0'
        >
          What clients <span className='text-accent'>say.</span>
        </motion.h1>
        {/* slider */}
        <motion.div
          variants={fadeIn('up', 0.4)}
          initial='hidden'
          animate='show'
          exit='hidden'
        >
          <TestimonialSlider />
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialsContent;
