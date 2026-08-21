'use client';

// next image
import Image from 'next/image';

const Avatar = () => {
  return (
    <div className='hidden xl:flex xl:max-w-none'>
      <Image
        src={'/avatar.png'}
        width={704}
        height={1433}
        alt=''
        // className='translate-z-0 h-full w-auto object-contain max-h-[678px]'
        className='translate-z-0 w-full h-full w-auto object-contain max-h-[1050px]'
      />
    </div>
  );
};

export default Avatar;
