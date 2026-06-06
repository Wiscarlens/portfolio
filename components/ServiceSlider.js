// import swiper react components
import { Swiper, SwiperSlide } from 'swiper/react';

// import swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// icons
import {
  RxDesktop,
  RxMobile,
  RxRocket,
  RxComponent1,
  RxPencil2,
  RxArrowTopRight,
} from 'react-icons/rx';

// import required modules
import { FreeMode, Pagination } from 'swiper/modules';

// service data
export const serviceData = [
  {
    icon: <RxDesktop />,
    title: 'Full-Stack Web Development',
    description:
      'End-to-end web apps with Next.js, TypeScript, React, and Node.js — from architecture to deployment.',
  },
  {
    icon: <RxMobile />,
    title: 'Mobile Development',
    description:
      'Modern Android apps in Kotlin and Jetpack Compose with clean, intuitive UI.',
  },
  {
    icon: <RxRocket />,
    title: 'Backend & API Engineering',
    description:
      'Secure, scalable REST APIs, authentication (Clerk), and third-party integrations (Stripe, EMR).',
  },
  {
    icon: <RxComponent1 />,
    title: 'Database & DevOps',
    description:
      'PostgreSQL, Prisma ORM, Docker, NGINX, Vercel — serverless and self-hosted deployments.',
  },
  {
    icon: <RxPencil2 />,
    title: 'UI/UX Implementation',
    description:
      'Translating Figma designs into pixel-accurate, accessible, responsive interfaces.',
  },
];

const ServiceSlider = () => {
  return (
    <Swiper
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 15,
        },

        640: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
      }}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode, Pagination]}
      className='h-[240px] sm:h-[340px]'
    >
      {serviceData.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <div className='bg-[rgba(65,47,123,0.15)] h-max rounded-lg px-6 py-8 flex sm:flex-col gap-x-6 sm:gap-x-0 group cursor-pointer hover:bg-[rgba(89,65,169,0.15)] transition-all duration-300'>
              {/* icon */}
              <div className='text-4xl text-accent mb-4'>{item.icon}</div>
              {/* title & desc */}
              <div className='mb-8'>
                <div className='mb-2 text-lg'>{item.title}</div>
                <p className='max-w-[350px] leading-normal'>
                  {item.description}
                </p>
              </div>
              {/* arrow */}
              <div className='text-3xl'>
                <RxArrowTopRight className='group-hover:rotate-45 group-hover:text-accent transition-all duration-300' />
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ServiceSlider;
