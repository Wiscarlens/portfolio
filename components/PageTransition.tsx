'use client';

// Route-change animation for the App Router.
//
// The Pages Router version keyed AnimatePresence on router.route inside
// _app.js. Here the equivalent signal is usePathname(); the layout stays
// mounted across navigations, so this wrapper is what re-keys and replays
// the transition.

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import Transition from './Transition';

const PageTransition = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode='wait'>
      <motion.div key={pathname} className='h-full'>
        <Transition />
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
