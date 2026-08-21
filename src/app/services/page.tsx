import type { Metadata } from 'next';

import JsonLd from '../../components/JsonLd';
import { pageMetadata } from '../../lib/metadata';
import { getPageMeta } from '../../lib/site';
import { pageGraph } from '../../lib/structuredData';

import ServicesContent from './content';

const PATH = '/services';

export const metadata: Metadata = pageMetadata(PATH);

export default function Page() {
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
      <ServicesContent />
    </>
  );
}
