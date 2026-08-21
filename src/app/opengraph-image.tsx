// Site-wide share card. Route segments with their own opengraph-image.tsx
// override this one.
import { ogAlt, renderOgImage } from '../lib/og';

export { size, contentType } from '../lib/og';
export const alt = ogAlt();

export default function Image() {
  return renderOgImage();
}
