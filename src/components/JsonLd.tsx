// Renders a JSON-LD <script> tag. Next.js has no built-in structured-data
// API, so this stays a manual script element in both routers.
//
// Server component on purpose — the JSON is serialized during SSR and ships
// in the initial HTML, which is what crawlers read.

import type { JsonLdGraph } from '../lib/structuredData';

const JsonLd = ({ graph }: { graph: JsonLdGraph }) => (
  <script
    type='application/ld+json'
    dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
  />
);

export default JsonLd;
