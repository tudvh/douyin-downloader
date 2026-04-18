import { FlatCompat } from '@eslint/eslintrc'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImports from 'eslint-plugin-unused-imports'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  // Ignore patterns (should be first)
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },

  // Next.js base configs
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // eslint-plugin-prettier/recommended (includes eslint-config-prettier to disable conflicting rules)
  prettierRecommended,

  // eslint-plugin-simple-import-sort & eslint-plugin-unused-imports
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    rules: {
      // eslint-plugin-simple-import-sort
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // eslint-plugin-unused-imports
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // Restrict next/link and next/navigation from being used directly
      'no-restricted-imports': [
        'warn',
        {
          paths: [
            {
              name: 'next/link',
              message:
                'Please use `Link` from `@/i18n/navigation` to enable automatic i18n routing.',
            },
            {
              name: 'next/navigation',
              importNames: ['useRouter'],
              message:
                'Please use hook `useRouter` from `@/i18n/navigation` to enable automatic i18n routing.',
            },
            {
              name: 'next/navigation',
              importNames: ['usePathname'],
              message:
                'Please use hook `usePathname` from `@/i18n/navigation` to enable automatic i18n routing.',
            },
            {
              name: 'next/navigation',
              importNames: ['redirect'],
              message:
                'Please use function `redirect` from `@/i18n/navigation` to enable automatic i18n routing.',
            },
          ],
        },
      ],
    },
  },
]

export default eslintConfig
