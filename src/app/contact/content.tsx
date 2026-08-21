'use client';

// icons
import { BsArrowRight } from 'react-icons/bs';

// framer
import { motion } from 'framer-motion';

// variants
import { fadeIn } from '../../variants';


const ContactContent = () => {
  return (
    <div className='min-h-screen xl:h-full bg-primary/30'>
      <div className='container mx-auto pt-36 pb-28 xl:py-32 text-center xl:text-left flex items-start xl:items-center justify-center min-h-screen xl:h-full'>
        {/* text & form */}
        <div className='flex flex-col w-full max-w-[700px]'>
          {/* text */}
          <motion.h1
            variants={fadeIn('up', 0.2)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='h2 text-center mb-12'
          >
            Let&apos;s <span className='text-accent'>connect.</span>
          </motion.h1>
          {/* form — submits via mailto so it works without a backend */}
          <motion.form
            variants={fadeIn('up', 0.4)}
            initial='hidden'
            animate='show'
            exit='hidden'
            action='mailto:wiscarlens@gmail.com'
            method='post'
            encType='text/plain'
            className='flex-1 flex flex-col gap-6 w-full mx-auto'
          >
            {/* input group */}
            <div className='flex gap-x-6 w-full'>
              <input
                type='text'
                name='name'
                placeholder='name'
                className='input'
                required
              />
              <input
                type='email'
                name='email'
                placeholder='email'
                className='input'
                required
              />
            </div>
            <input
              type='text'
              name='subject'
              placeholder='subject'
              className='input'
            />
            <textarea
              name='message'
              placeholder='message'
              className='textarea'
              required
            ></textarea>
            <button
              type='submit'
              className='btn rounded-full border border-white/50 max-w-[170px] px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent group'
            >
              <span className='group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500'>
                Let&apos;s talk
              </span>
              <BsArrowRight className='-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]' />
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default ContactContent;
