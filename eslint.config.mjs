import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
  {
    // Project-wide rule overrides
    rules: {
      /**
       * Allow parameters prefixed with _ to be unused.
       * This is the standard TypeScript convention for intentionally unused
       * parameters (common in stub/placeholder functions that will be implemented later).
       * e.g. function foo(_slug: string): never { throw new Error('TODO') }
       */
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
]);

export default eslintConfig;
