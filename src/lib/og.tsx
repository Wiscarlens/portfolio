// Shared renderer for the opengraph-image file convention.
//
// Each route segment re-exports `size`/`contentType` and calls renderOgImage()
// with its own label, so /work and /about get distinct share cards while the
// artwork stays defined once.

import { ImageResponse } from 'next/og';

import { person, site } from './site';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const NAME = person.brandName;
const ROLE = person.jobTitle;
const TAGLINE = 'Scalable full-stack software, from design to deployment.';
const ACCENT = site.accentColor;

/** Alt text for a segment's share card. */
export const ogAlt = (label?: string) =>
  label ? `${NAME} — ${label}` : `${NAME} — ${ROLE}`;

/**
 * @param label Section name shown in the eyebrow. Omit on the home page,
 *              where the role is shown instead.
 */
export const renderOgImage = (label?: string) =>
  new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background:
            'linear-gradient(135deg, #131424 0%, #1d1f38 60%, #2a1620 100%)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -160,
            right: -160,
            width: 620,
            height: 620,
            borderRadius: '50%',
            background: ACCENT,
            opacity: 0.22,
          }}
        />
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            letterSpacing: 6,
            color: ACCENT,
            marginBottom: 28,
          }}
        >
          {(label ?? ROLE).toUpperCase()}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 92,
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.1,
            letterSpacing: -2,
          }}
        >
          {NAME}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 34,
            color: 'rgba(255,255,255,0.62)',
            marginTop: 28,
          }}
        >
          {label ? ROLE : TAGLINE}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 56,
            fontSize: 26,
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 3,
              background: ACCENT,
              marginRight: 16,
            }}
          />
          {'wiscarlens.com  ·  Orlando, FL'}
        </div>
      </div>
    ),
    size
  );
