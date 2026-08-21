'use client';

// Wordmark: a terminal prompt reading ~/j.l.wiscarlens with a blinking block
// cursor. Text-based rather than an image, so it stays crisp at any size and
// costs no extra network request.

import { JetBrains_Mono } from 'next/font/google';

const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['500'] });

const ACCENT = '#F13024';

type Props = {
  /** Font size in px. Nav: 13–15. Hero: 40+. Minimum: 12. */
  size?: number;
  /** 'dark' = white text (dark backgrounds). 'light' = near-black. 'mono' = all one color. */
  variant?: 'dark' | 'light' | 'mono';
  /** Blinking block cursor. */
  cursor?: boolean;
  color?: string;
  className?: string;
};

const Logo = ({
  size = 14,
  variant = 'light',
  cursor = true,
  color,
  className,
}: Props) => {
  const isMono = variant === 'mono';
  const text =
    color ?? (isMono ? 'currentColor' : variant === 'dark' ? '#FFFFFF' : '#111111');
  const accent = isMono ? text : ACCENT;

  return (
    <span
      className={`${mono.className} ${className ?? ''}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontSize: size,
        fontWeight: 500,
        letterSpacing: size >= 24 ? '-0.04em' : '-0.02em',
        lineHeight: 1,
        color: text,
        whiteSpace: 'nowrap',
      }}
      role='img'
      aria-label='J. L. Wiscarlens'
    >
      <span style={{ color: accent }}>~/</span>
      <span>j.l.wiscarlens</span>
      {cursor && (
        <span
          aria-hidden='true'
          // Keyframes live in globals.css so they're defined once for the app
          // rather than re-emitted by every rendered logo.
          className='logo-cursor'
          style={{
            width: Math.max(3, Math.round(size * 0.46)),
            height: size,
            marginLeft: Math.round(size * 0.42),
            background: accent,
          }}
        />
      )}
    </span>
  );
};

export default Logo;
