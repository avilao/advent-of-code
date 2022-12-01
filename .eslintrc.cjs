/* eslint-disable */
module.exports = {
  env: {
    es6: true,
    es2021: true,
    jest: true,
  },
  extends: ['eslint:recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['import', 'prettier'],
  rules: {
    // 'comma-dangle': ['error', 'only-multiline'],
    'import/order': [
      'error',
      {
        alphabetize: {
          /* ignore case. Options: [true, false] */
          caseInsensitive: true,
          /* sort in ascending order. Options: ["ignore", "asc", "desc"] */
          order: 'asc',
        },
        groups: [
          'builtin', // Built-in imports (come from NodeJS native) go first
          'external', // <- External imports
          'internal', // <- Absolute imports
          ['sibling', 'parent'], // <- Relative imports, the sibling and parent types they can be mingled together
          'index', // <- index imports
          'unknown', // <- unknown
        ],
        'newlines-between': 'always',
        pathGroups: [
          {
            group: 'builtin',
            pattern: 'react',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
      },
    ],
    'linebreak-style': ['error', 'unix'],
    'prettier/prettier': 2, // Means error
    'react/react-in-jsx-scope': 'off',
    semi: ['error', 'always'],
    'sort-imports': [
      'error',
      {
        allowSeparatedGroups: true,
        ignoreCase: false,
        ignoreDeclarationSort: true, // don"t want to sort import lines, use eslint-plugin-import instead
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],

    'sort-keys': [
      'error',
      'asc',
      { caseSensitive: true, minKeys: 2, natural: false },
    ],
  },
};
