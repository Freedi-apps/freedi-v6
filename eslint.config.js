import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import prettier from 'eslint-plugin-prettier'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import importPlugin from 'eslint-plugin-import'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.es6,
        ...globals.node
      },
      parserOptions: {
        project: './tsconfig.json'
      }
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react': react,
      'prettier': prettier,
      'jsx-a11y': jsxA11y,
      'import': importPlugin,
      '@typescript-eslint': tseslint.plugin
    },
    settings: {
      react: {
        version: '18.x'
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx']
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: ['./tsconfig.json']
        }
      }
    },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      'plugin:prettier/recommended',
      'plugin:jsx-a11y/recommended'
    ],
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      'react/display-name': 'error',
      'react/no-unescaped-entities': 'off',
      'import/no-anonymous-default-export': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'no-duplicate-case': 'error',
      'newline-before-return': 'error',
      'import/newline-after-import': ['error', { count: 1 }],
      '@typescript-eslint/ban-types': [
        'error',
        {
          extendDefaults: true,
          types: {
            '{}': false
          }
        }
      ],
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
      'indent': ['error', 'tab'],
      'no-multiple-empty-lines': [
        'error',
        { max: 1, maxEOF: 0, maxBOF: 0 }
      ]
    }
  }
)