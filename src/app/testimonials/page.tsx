import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import JsonLd from '../../components/JsonLd';
import { pageMetadata } from '../../lib/metadata';
import { getPageMeta, isRouteEnabled } from '../../lib/site';
import { pageGraph } from '../../lib/structuredData';

import TestimonialsContent from './content';

const PATH = '/testimonials';

export const metadata: Metadata = pageMetadata(PATH);

export default function Page() {
  // Switched off in lib/site.ts. The files stay put so the page can be turned
  // back on, but while it's off the URL must not resolve.
  if (!isRouteEnabled(PATH)) notFound();

  const { title, description } = getPageMeta(PATH);

  return (
    <>
      <JsonLd
        graph={pageGraph({
          path: PATH,
          title,
          description,
          type: 'CollectionPage',
        })}
      />
      <TestimonialsContent />
    </>
  );
}
