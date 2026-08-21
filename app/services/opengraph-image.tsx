import { ogAlt, renderOgImage } from '../../lib/og';

export { size, contentType } from '../../lib/og';
export const alt = ogAlt('Services');

export default function Image() {
  return renderOgImage('Services');
}
