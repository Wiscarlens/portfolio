'use client';

// Route-change animation.
//
// This is a template, not part of the layout, and that distinction is the
// whole point: Next.js keeps layouts mounted across navigations but gives
// every navigation a fresh template instance. Remounting is what replays the
// Transition wipe and re-runs each page's `initial='hidden' animate='show'`
// variants. With this same markup in layout.tsx the components persisted, so
// the overlays stayed parked at their exit position and page content stayed
// at opacity 0 until a hard refresh.

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

import Transition from '../components/Transition';

export default function Template({ children }: { children: ReactNode }) {
  return (
    // reducedMotion='user' makes every Framer Motion animation in the tree
    // respect the OS "reduce motion" setting — the full-screen wipe and the
    // staggered slide-ins are exactly the kind of movement that triggers
    // vestibular discomfort.
    <MotionConfig reducedMotion='user'>
      <Transition />
      {children}
    </MotionConfig>
  );
}
