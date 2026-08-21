// Dynamic robots.txt so the sitemap URL always matches the deployed origin.

import { absoluteUrl, SITE_URL } from '../lib/site';

// Crawlers for AI assistants and answer engines. Listed explicitly and
// allowed so the site can be cited in AI-generated answers. To opt out of
// any one of them, change its Allow line to `Disallow: /`.
const AI_CRAWLERS = [
  'GPTBot', // OpenAI — ChatGPT training
  'OAI-SearchBot', // OpenAI — ChatGPT search index
  'ChatGPT-User', // OpenAI — live browsing on a user's behalf
  'ClaudeBot', // Anthropic — Claude training
  'Claude-User', // Anthropic — live browsing on a user's behalf
  'Claude-SearchBot', // Anthropic — Claude search index
  'PerplexityBot', // Perplexity — search index
  'Perplexity-User', // Perplexity — live browsing
  'Google-Extended', // Google — Gemini / AI Overviews grounding
  'Applebot-Extended', // Apple — Apple Intelligence
  'Bingbot', // Microsoft — Bing + Copilot
  'DuckAssistBot', // DuckDuckGo
  'cohere-ai',
  'Meta-ExternalAgent',
];

export const getServerSideProps = async ({ res }) => {
  const body = [
    '# Allow every well-behaved crawler full access.',
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    'Allow: /api/og', // the Open Graph image must stay fetchable
    '',
    '# AI assistants and answer engines — explicitly welcome.',
    ...AI_CRAWLERS.flatMap((bot) => [`User-agent: ${bot}`, 'Allow: /', '']),
    `Host: ${SITE_URL.replace(/^https?:\/\//, '')}`,
    `Sitemap: ${absoluteUrl('/sitemap.xml')}`,
    '',
  ].join('\n');

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate'
  );
  res.write(body);
  res.end();

  return { props: {} };
};

export default function Robots() {
  return null;
}
