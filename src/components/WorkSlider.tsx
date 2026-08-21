'use client';

type WorkImage = { title: string; path: string };
type WorkSlide = { images: WorkImage[] };

// work slider data
// TODO: replace /thumb*.jpg with real project screenshots in /public
export const workSlider: { slides: WorkSlide[] } = {
  slides: [
    {
      images: [
        {
          title: 'Sports Player Evaluation Platform',
          path: '/thumb1.jpg',
        },
        {
          title: 'Player Injury Tracking Dashboard',
          path: '/thumb2.jpg',
        },
        {
          title: 'Candace Crowe Practice Platform',
          path: '/thumb3.jpg',
        },
        {
          title: 'VA Android App',
          path: '/thumb4.jpg',
        },
      ],
    },
    {
      images: [
        {
          title: 'Google I/O Hackathon — 3rd Place',
          path: '/thumb1.jpg',
        },
        {
          title: 'Slack & Email Notification System',
          path: '/thumb2.jpg',
        },
        {
          title: 'Stripe Billing Integration',
          path: '/thumb3.jpg',
        },
        {
          title: 'Personal Portfolio',
          path: '/thumb4.jpg',
        },
      ],
    },
  ],
};

// import swiper react components
import { Swiper, SwiperSlide } from 'swiper/react';

// import swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

// icons
import { BsArrowRight } from 'react-icons/bs';
// next image
import Image from 'next/image';

const WorkSlider = () => {
  return (
    <Swiper
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className='h-[280px] sm:h-[480px]'
    >
      {workSlider.slides.map((slide, index) => {
        return (
          <SwiperSlide key={index}>
            <div className='grid grid-cols-2 grid-rows-2 gap-4 cursor-pointer'>
              {slide.images.map((image, index) => {
                return (
                  <div
                    className='relative rounded-lg overflow-hidden flex items-center justify-center group'
                    key={index}
                  >
                    <div className='flex items-center justify-center relative overflow-hidden group'>
                      {/* image */}
                      <Image
                        src={image.path}
                        width={500}
                        height={300}
                        alt={image.title}
                      />
                      {/* overlay gradient */}
                      <div className='absolute inset-0 bg-gradient-to-l from-transparent via-[#e838cc] to-[#4a22bd] opacity-0 group-hover:opacity-80 transition-all duration-700'></div>
                      {/* title */}
                      <div className='absolute bottom-0 translate-y-full group-hover:-translate-y-10 group-hover:xl:-translate-y-20 transition-all duration-300 px-4'>
                        <div className='flex items-center gap-x-2 text-[13px] tracking-[0.2em] uppercase'>
                          {/* project title */}
                          <div className='delay-100 text-center'>
                            {image.title}
                          </div>
                          {/* icon */}
                          <div className='text-xl translate-y-[500%] group-hover:translate-y-0 transition-all duration-300 delay-200'>
                            <BsArrowRight />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default WorkSlider;
