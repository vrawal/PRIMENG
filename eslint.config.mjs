import nx from '@nx/eslint-plugin';
import perfectionist from 'eslint-plugin-perfectionist';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    plugins: {
      perfectionist,
    },
    rules: {
      // Import sorting - Angular best practices
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
          groups: [
            'type',
            ['builtin', 'external'],
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'unknown',
          ],
          newlinesBetween: 'ignore',
          internalPattern: ['^@primeng/**', '^@app/**', '^@env/**'],
        },
      ],

      // Class members sorting - Angular best practices
      'perfectionist/sort-classes': [
        'error',
        {
          type: 'natural',
          order: 'asc',
          groups: [
            'static-property',
            'static-accessor-property',
            'static-block',
            'static-get-method',
            'static-set-method',
            'static-method',
            'decorated-property',
            'property',
            'accessor-property',
            'constructor',
            'decorated-get-method',
            'get-method',
            'decorated-set-method',
            'set-method',
            'decorated-method',
            'method',
            'unknown',
          ],
        },
      ],

      // Object sorting for better readability
      'perfectionist/sort-objects': [
        'error',
        {
          type: 'natural',
          order: 'asc',
          partitionByComment: true,
        },
      ],

      // Interface and type sorting
      'perfectionist/sort-interfaces': [
        'error',
        {
          type: 'natural',
          order: 'asc',
          partitionByComment: true,
        },
      ],

      // Named imports/exports sorting
      'perfectionist/sort-named-imports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],

      'perfectionist/sort-named-exports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],

      // Array includes for better readability
      'perfectionist/sort-array-includes': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
    },
  },
];
