import type { Metadata } from 'next';

import JsonLd from '../../components/JsonLd';
import { pageMetadata } from '../../lib/metadata';
import { getPageMeta } from '../../lib/site';
import { pageGraph } from '../../lib/structuredData';

import AboutContent from './content';

const PATH = '/about';

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
          type: 'ProfilePage',
        })}
      />
      <AboutContent />
    </>
  );
}
