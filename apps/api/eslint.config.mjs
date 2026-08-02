import js from '@eslint/js';
import tseslint from 'typescript-eslint';

/**
 * ESLint für die API.
 *
 * Bewusst ohne typgestützte Regeln: Der Typecheck läuft ohnehin separat über
 * `tsc --noEmit`, und die typgestützten Regelsätze verlangen ein zweites
 * Programm-Parsing, das den Lauf in CI merklich verlangsamt.
 */
export default tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**', 'prisma/migrations/**'],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    languageOptions: {
      parserOptions: {
        // Decorator-Metadaten sind bei NestJS überall im Einsatz
        ecmaFeatures: { decorators: true },
      },
    },

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

      // Nest injiziert über Konstruktorparameter; leere Konstruktoren sind
      // dort ein legitimes Muster.
      '@typescript-eslint/no-empty-function': ['error', { allow: ['constructors'] }],

      // Prisma-Filter und Swagger-Schemata sind stellenweise nicht sinnvoll
      // typisierbar – als Warnung sichtbar, aber kein Buildstopper.
      '@typescript-eslint/no-explicit-any': 'warn',

      // Ein vergessenes await bei Prisma-Aufrufen ist ein realer Fehlerfall
      'require-await': 'off',
      'no-return-await': 'error',
    },
  },

  {
    // Seed und Skripte laufen einmalig von Hand, dort ist console.log gewollt
    files: ['prisma/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
);
