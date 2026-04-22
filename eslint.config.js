import js from '@eslint/js'
import ts from 'typescript-eslint'
import svelte from 'eslint-plugin-svelte'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

const gameplayDirectories = [
  'engine/**/*.{ts,js,svelte}',
  'events/**/*.{ts,js,svelte}',
  'content-system/**/*.{ts,js,svelte}',
  'flow/**/*.{ts,js,svelte}',
  'scene/**/*.{ts,js,svelte}',
  'memoir/**/*.{ts,js,svelte}',
  'birth/**/*.{ts,js,svelte}',
  'death/**/*.{ts,js,svelte}',
  'continuation/**/*.{ts,js,svelte}',
  'worldgen/**/*.{ts,js,svelte}',
  'persistence/**/*.{ts,js,svelte}',
  'rng/**/*.{ts,js,svelte}',
  'time/**/*.{ts,js,svelte}',
  'loading/**/*.{ts,js,svelte}',
  'ui-lib/**/*.{ts,js,svelte}',
  'routes/**/*.{ts,js,svelte}',
  'utils/**/*.{ts,js,svelte}'
]

export default ts.config(
  {
    ignores: [
      '.svelte-kit/**',
      'build/**',
      'dist/**',
      'built/**',
      'node_modules/**',
      '.claude/**',
      'coverage/**'
    ]
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs['flat/recommended'],
  prettier,
  ...svelte.configs['flat/prettier'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    files: ['**/*.svelte', '**/*.svelte.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: ['.svelte']
      }
    }
  },
  {
    files: gameplayDirectories,
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "CallExpression[callee.type='MemberExpression'][callee.object.name='Math'][callee.property.name='random']",
          message:
            'Math.random() is forbidden in gameplay code. Use the seeded RNG from rng/ — determinism is load-bearing (ARCHITECTURE.md §26).'
        },
        {
          selector:
            "CallExpression[callee.type='MemberExpression'][callee.object.name='crypto'][callee.property.name='getRandomValues']",
          message:
            'crypto.getRandomValues() is forbidden in gameplay code. Use the seeded RNG from rng/.'
        },
        {
          selector:
            "CallExpression[callee.type='MemberExpression'][callee.object.name='Date'][callee.property.name='now']",
          message:
            'Date.now() is forbidden in gameplay code. Use GameTime from time/ for gameplay logic. Date.now() is permitted only in tests, scripts, and outside the simulation (metadata, logging, performance measurement).'
        }
      ],
      '@typescript-eslint/no-explicit-any': 'error'
    }
  },
  {
    files: ['tests/**', 'scripts/**', '**/*.{test,spec}.ts', '**/*.test.svelte'],
    rules: {
      'no-restricted-syntax': 'off',
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
)
