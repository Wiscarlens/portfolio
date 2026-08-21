import type { MetadataRoute } from 'next';

import { SITE_HOST, absoluteUrl } from '../lib/site';

// Crawlers for AI assistants and answer engines. Listed explicitly and
// allowed so the site can be cited in AI-generated answers. To opt out of
// any one of them, move its name into a rule with `disallow: '/'`.
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

// Next serves this at /robots.txt.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: '/api/' },
      { userAgent: AI_CRAWLERS, allow: '/' },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: SITE_HOST,
  };
}
