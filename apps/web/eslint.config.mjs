import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

/**
 * ESLint für die Storefront.
 *
 * Grundlage sind die Next.js-Regelsätze inklusive Barrierefreiheitsprüfungen
 * (jsx-a11y). Ergänzt um einige Regeln, die in diesem Projekt konkrete Fehler
 * verhindert haben.
 */
const config = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  {
    ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'],
  },

  {
    rules: {
      // Ungenutzte Variablen sind ein Fehler, außer sie beginnen mit _
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      // Konsistente Typimporte halten das Client-Bundle frei von Typ-Modulen
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],

      // Barrierefreiheit: In diesem Projekt tragen alle dekorativen Icons
      // aria-hidden und alle Bilder einen aussagekräftigen Alt-Text.
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/label-has-associated-control': ['error', { assert: 'either', depth: 3 }],

      // <img> statt next/image kostet Ladezeit und Core Web Vitals
      '@next/next/no-img-element': 'error',
    },
  },

  {
    // Der Adminbereich ist nicht indexiert und arbeitet mit dynamischen
    // Formularfeldern; dort ist react-hook-forms any-Typisierung unvermeidbar.
    files: ['src/components/admin/**', 'src/components/checkout/**'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];

export default config;
