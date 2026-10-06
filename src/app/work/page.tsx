import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import JsonLd from '../../components/JsonLd';
import { pageMetadata } from '../../lib/metadata';
import { getPageMeta, isRouteEnabled } from '../../lib/site';
import { pageGraph } from '../../lib/structuredData';

import WorkContent from './content';

const PATH = '/work';

export const metadata: Metadata = pageMetadata(PATH);

export default function Page() {
  // Switched off in lib/site.ts. Files stay put so the page can come back.
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
      <WorkContent />
    </>
  );
}
