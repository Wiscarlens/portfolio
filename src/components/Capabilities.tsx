'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

// icons
import {
  RxComponent1,
  RxDesktop,
  RxMagicWand,
  RxMobile,
  RxPencil2,
  RxRocket,
} from 'react-icons/rx';

type Capability = {
  icon: ReactNode;
  title: string;
  description: string;
  /** The actual tools. Concrete beats adjectives on a capability list. */
  stack: string[];
};

export const capabilities: Capability[] = [
  {
    icon: <RxDesktop />,
    title: 'Full-Stack Web Development',
    description:
      'End-to-end products, from the first architecture decision to what runs in production.',
    stack: ['Next.js', 'TypeScript', 'React', 'Node.js'],
  },
  {
    icon: <RxMagicWand />,
    title: 'AI Integration',
    description:
      'LLM features in real products: retrieval over private data, structured output, and tool-calling agents.',
    stack: ['LLM APIs', 'RAG', 'Vector search', 'Agent tooling'],
  },
  {
    icon: <RxRocket />,
    title: 'Backend & API Engineering',
    description:
      'Secure REST APIs, authentication, and the third-party integrations that carry the business logic.',
    stack: ['Java', 'Spring', 'Clerk', 'Stripe', 'EMR'],
  },
  {
    icon: <RxComponent1 />,
    title: 'Database & DevOps',
    description:
      'Schema design and the pipeline that gets it deployed, serverless or self-hosted.',
    stack: ['PostgreSQL', 'Prisma', 'Docker', 'NGINX', 'Vercel'],
  },
  {
    icon: <RxMobile />,
    title: 'Mobile Development',
    description:
      'Native Android in Kotlin, or cross-platform with React Native when one codebase should serve both stores.',
    stack: ['Kotlin', 'Jetpack Compose', 'React Native'],
  },
  {
    icon: <RxPencil2 />,
    title: 'Interface Engineering',
    description:
      'Designs turned into accessible, responsive interfaces that hold up on real devices.',
    stack: ['Tailwind', 'Framer Motion', 'a11y'],
  },
];

const Capabilities = () => {
  return (
    <ol className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5'>
      {capabilities.map((item, i) => (
        <motion.li
          key={item.title}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          // Staggered reveal: the list assembles itself top-left to
          // bottom-right rather than all arriving at once.
          transition={{ duration: 0.5, delay: 0.15 + i * 0.07, ease: 'easeOut' }}
          className='group border-t border-white/10 pt-3 transition-colors duration-300 hover:border-accent/40'
        >
          <div className='flex items-center justify-between mb-1.5'>
            <span className='font-mono text-[10px] tracking-[2px] text-white/30 tabular-nums transition-colors duration-300 group-hover:text-accent'>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span
              aria-hidden='true'
              className='text-lg text-white/25 transition-colors duration-300 group-hover:text-accent'
            >
              {item.icon}
            </span>
          </div>
          <h3 className='text-[15px] leading-snug text-white/90 mb-1'>
            {item.title}
          </h3>
          <p className='text-[12.5px] leading-[1.55] text-white/45 mb-2'>
            {item.description}
          </p>
          <p className='font-mono text-[10px] leading-relaxed text-white/25'>
            {item.stack.join('  ·  ')}
          </p>
        </motion.li>
      ))}
    </ol>
  );
};

export default Capabilities;
