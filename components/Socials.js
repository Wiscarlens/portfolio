// links
import Link from 'next/link';

// icons
import {
  RiLinkedinLine,
  RiGithubLine,
  RiMailLine,
  RiTwitterXLine,
  RiMediumLine,
} from 'react-icons/ri';

const Socials = () => {
  return (
    <div className='flex items-center gap-x-5 text-lg'>
      <Link
        href='https://www.linkedin.com/in/wiscarlens'
        target='_blank'
        rel='noopener noreferrer'
        aria-label='LinkedIn'
        className='hover:text-accent transition-all duration-300'
      >
        <RiLinkedinLine />
      </Link>
      <Link
        href='https://github.com/Wiscarlens'
        target='_blank'
        rel='noopener noreferrer'
        aria-label='GitHub'
        className='hover:text-accent transition-all duration-300'
      >
        <RiGithubLine />
      </Link>
      <Link
        href='mailto:wiscarlens@gmail.com'
        aria-label='Email'
        className='hover:text-accent transition-all duration-300'
      >
        <RiMailLine />
      </Link>
      {/* TODO: replace # with real Twitter/X handle */}
      <Link
        href='#'
        target='_blank'
        rel='noopener noreferrer'
        aria-label='Twitter / X'
        className='hover:text-accent transition-all duration-300'
      >
        <RiTwitterXLine />
      </Link>
      {/* TODO: replace # with real Medium handle */}
      <Link
        href='#'
        target='_blank'
        rel='noopener noreferrer'
        aria-label='Medium'
        className='hover:text-accent transition-all duration-300'
      >
        <RiMediumLine />
      </Link>
    </div>
  );
};

export default Socials;
