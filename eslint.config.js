import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

/**
 * Flat config (ESLint 9). Kept close to the recommended sets — the point is to
 * catch real mistakes (bad hook usage, unused code, broken JSX) in CI, not to
 * enforce formatting.
 */
export default [
  { ignores: ['dist/**', 'node_modules/**'] },

  js.configs.recommended,

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.es2021 },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,

      // This is a plain-JS project that deliberately does not use PropTypes;
      // the rule would fire on every component without catching real defects.
      'react/prop-types': 'off',

      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Allow intentionally-unused catch bindings and capitalised constants.
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', caughtErrors: 'none' }],
    },
  },

  {
    // The provider and its hook belong in one file; splitting them purely to
    // satisfy Fast Refresh granularity would add a module for no benefit.
    files: ['src/hooks/useTheme.jsx'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },

  {
    // Config files run in Node, not the browser.
    files: ['*.config.js', 'api/**/*.js', 'server/**/*.js'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
]
