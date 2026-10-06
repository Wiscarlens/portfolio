import type { Metadata } from 'next';
import Link from 'next/link';

import Circles from '../components/Circles';
import { isRouteEnabled } from '../lib/site';

export const metadata: Metadata = {
  title: 'Page not found',
  // A 404 has no canonical content worth indexing.
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className='min-h-screen xl:h-full bg-primary/30 pt-40 pb-28 xl:py-32 flex items-start xl:items-center'>
      <Circles />
      <div className='container mx-auto text-center xl:text-left'>
        <p className='text-accent uppercase tracking-[3px] text-sm mb-4'>
          404
        </p>
        <h1 className='h2'>
          This page doesn&apos;t <span className='text-accent'>exist.</span>
        </h1>
        <p className='max-w-[500px] mx-auto xl:mx-0 mb-8'>
          The link may be out of date, or the page may have moved. Everything
          else is still where you left it.
        </p>
        <div className='flex flex-wrap gap-4 justify-center xl:justify-start'>
          <Link
            href='/'
            className='btn rounded-full border border-white/50 px-8 flex items-center justify-center hover:border-accent transition-all duration-300'
          >
            Back home
          </Link>
          <Link
            href={isRouteEnabled('/work') ? '/work' : '/about'}
            className='btn rounded-full border border-white/50 px-8 flex items-center justify-center hover:border-accent transition-all duration-300'
          >
            {isRouteEnabled('/work') ? 'See my work' : 'More about me'}
          </Link>
        </div>
      </div>
    </div>
  );
}
