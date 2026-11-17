import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { readabilityConfigs } from './scripts/eslint/readability-rules.mjs';

const librarySources = ['packages/electron-trpc/src/**/*.ts'];

export default tseslint.config(
  { ignores: ['**/dist/**', '**/node_modules/**', '**/*.d.ts'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: librarySources,
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
    },
  },
  ...readabilityConfigs({ files: librarySources })
);
