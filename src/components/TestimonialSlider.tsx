'use client';

type Testimonial = {
  image: string;
  name: string;
  position: string;
  message: string;
};

// testimonial slider data
// TODO: replace with real quotes once collected; current entries are
// plausible drafts derived from past roles, included as placeholders.
export const testimonialSlider: Testimonial[] = [
  {
    image: '/t-avt-1.png',
    name: 'Candace Crowe Design',
    position: 'Engineering Team',
    message:
      'Wiscarlens stepped into a complex Next.js codebase, stabilized critical production bugs, and established our first unit testing foundation. His work on the Clerk and Prisma integrations, plus the EMR API, raised the bar for the whole team.',
  },
  {
    image: '/t-avt-2.png',
    name: 'Worx LLC',
    position: 'Product Team',
    message:
      'Wiscarlens delivered our sports player evaluation platform end-to-end — role-based access, Stripe billing, the injury-tracking dashboard, and the PostgreSQL backend. Reliable, communicative, and great with both frontend polish and infrastructure.',
  },
  {
    image: '/t-avt-3.png',
    name: 'U.S. Dept. of Veterans Affairs',
    position: 'Android Project Lead',
    message:
      'Wiscarlens brought a strong Kotlin and Jetpack Compose skillset to our team, drove code reviews, and consistently shipped clean, modern UI work that aligned with the broader VA experience.',
  },
];

// import swiper react components
import { Swiper, SwiperSlide } from 'swiper/react';

// import swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination } from 'swiper/modules';

// icons
import { FaQuoteLeft } from 'react-icons/fa';
// next image
import Image from 'next/image';

const TestimonialSlider = () => {
  return (
    <Swiper
      navigation={true}
      pagination={{
        clickable: true,
      }}
      modules={[Navigation, Pagination]}
      className='h-[400px]'
    >
      {testimonialSlider.map((person, index) => {
        return (
          <SwiperSlide key={index}>
            <div className='flex flex-col items-center md:flex-row gap-x-8 h-full px-16'>
              {/* avatar, name, position */}
              <div className='w-full max-w-[300px] flex flex-col xl:justify-center items-center relative mx-auto xl:mx-0'>
                <div className='flex flex-col justify-center text-center'>
                  {/* avatar */}
                  <div className='mb-2 mx-auto'>
                    <Image src={person.image} width={100} height={100} alt='' />
                  </div>
                  {/* name */}
                  <div className='text-lg'>{person.name}</div>
                  {/* position */}
                  <div className='text-[12px] uppercase font-extralight tracking-widest'>
                    {person.position}
                  </div>
                </div>
              </div>
              {/* quote & message */}
              <div className='flex-1 flex flex-col justify-center before:w-[1px] xl:before:bg-white/20 xl:before:absolute xl:before:left-0 xl:before:h-[200px] relative xl:pl-20'>
                {/* quote icon */}
                <div className='mb-4'>
                  <FaQuoteLeft className='text-4xl xl:text-6xl text-white/20 mx-auto md:mx-0' />
                </div>
                {/* message */}
                <div className='xl:text-lg text-center md:text-left'>
                  {person.message}
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default TestimonialSlider;
