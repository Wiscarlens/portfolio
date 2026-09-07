'use client';

import type { ReactNode } from 'react';

// icons
import {
  HiHome,
  HiUser,
  HiViewColumns,
  HiRectangleGroup,
  HiChatBubbleBottomCenterText,
  HiEnvelope,
} from 'react-icons/hi2';

// nav data
type NavItem = { name: string; path: string; icon: ReactNode };

export const navData: NavItem[] = [
  { name: 'Home', path: '/', icon: <HiHome /> },
  { name: 'About', path: '/about', icon: <HiUser /> },
  { name: 'What I do', path: '/services', icon: <HiRectangleGroup /> },
  { name: 'Work', path: '/work', icon: <HiViewColumns /> },
  {
    name: 'Testimonials',
    path: '/testimonials',
    icon: <HiChatBubbleBottomCenterText />,
  },
  {
    name: 'Contact',
    path: '/contact',
    icon: <HiEnvelope />,
  },
];

// next link
import Link from 'next/link';

// next router (App Router: pathname comes from next/navigation)
import { usePathname } from 'next/navigation';

// site config
import { isRouteEnabled } from '../lib/site';

const Nav = () => {
  const pathname = usePathname();
  return (
    <nav
      aria-label='Main'
      className='flex flex-col items-center xl:justify-center gap-y-4 fixed h-max bottom-0 mt-auto xl:right-[2%] z-50 top-0 w-full xl:w-16 xl:max-w-md xl:h-screen'>
      {/* inner */}
      <div
        className='flex w-full xl:flex-col items-center justify-between xl:justify-center gap-y-10 px-4 md:px-40 xl:px-0 h-[80px] xl:h-max py-8 bg-white/10
      backdrop-blur-sm text-3xl xl:text-xl xl:rounded-full'
      >
        {navData.filter((link) => isRouteEnabled(link.path)).map((link, index) => {
          return (
            <Link
              className={`${
                link.path === pathname && 'text-accent'
              } relative flex items-center group hover:text-accent transition-all duration-300`}
              href={link.path}
              key={index}
              aria-label={link.name}
              aria-current={link.path === pathname ? 'page' : undefined}
            >
              {/* tooltip */}
              <div className='absolute pr-14 right-0 hidden xl:group-hover:flex'>
                <div className='bg-white relative flex text-primary items-center p-[6px] rounded-[3px]'>
                  <div className='text-[12px] leading-none font-semibold'>
                    {link.name}
                  </div>
                  {/* triangle */}
                  <div className='border-solid border-l-white border-l-8 border-y-transparent border-y-[6px] border-r-0 absolute -right-2'></div>
                </div>
              </div>
              {/* icon */}
              <div>{link.icon}</div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Nav;
