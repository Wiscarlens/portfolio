// ESLint 9 flat config. Replaces .eslintrc.json — `next lint` was removed in
// Next.js 16, so `npm run lint` now calls eslint directly.

import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';

const config = [
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    ignores: ['.next/**', 'out/**', 'node_modules/**', 'next-env.d.ts'],
  },
  {
    // Tailwind's config is CommonJS by design; the TS import rule doesn't apply.
    files: ['*.config.js'],
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
];

export default config;
