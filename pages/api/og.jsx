// Generates the 1200x630 social share image on the fly, so link previews stay
// in sync with the site instead of drifting from a hand-exported PNG.
//
// Preview it at /api/og  or  /api/og?title=Work

import { ImageResponse } from 'next/og';

// Runs on the Node.js runtime (the Edge runtime is deprecated in Next 16).
export const config = { runtime: 'nodejs' };

const NAME = 'J.L Wiscarlens';
const ROLE = 'Software Engineer';
const TAGLINE = 'Scalable full-stack software, from design to deployment.';
const DOMAIN = 'wiscarlens.com';
const ACCENT = '#F13024';

export default async function handler(req, res) {
  const raw = req.query.title;
  const requested = (Array.isArray(raw) ? raw[0] : raw) || NAME;
  const label = requested.slice(0, 60);
  const isHome = label === NAME;

  try {
    const image = new ImageResponse(
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
          {/* accent glow */}
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

          {/* eyebrow: the section name, or the role on the home page */}
          <div
            style={{
              display: 'flex',
              fontSize: 26,
              letterSpacing: 6,
              color: ACCENT,
              marginBottom: 28,
            }}
          >
            {(isHome ? ROLE : label).toUpperCase()}
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
            {isHome ? TAGLINE : ROLE}
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
            {`${DOMAIN}  ·  Orlando, FL`}
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );

    // Pages Router API routes write through `res`, so drain the Response body.
    const body = Buffer.from(await image.arrayBuffer());

    res.setHeader('Content-Type', 'image/png');
    res.setHeader(
      'Cache-Control',
      'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800'
    );
    res.status(200).end(body);
  } catch (err) {
    console.error('OG image generation failed:', err);
    res.status(500).json({ error: 'Failed to generate image' });
  }
}
