import { defineConfig } from 'oxlint'

export default defineConfig({
  ignorePatterns: ['**/node_modules', '**/dist', '**/out'],

  plugins: ['eslint', 'typescript', 'unicorn', 'react', 'import'],

  env: {
    browser: true,
    node: true,
    es2022: true
  },

  settings: {
    react: {
      version: 'detect'
    }
  },

  categories: {
    correctness: 'error',
    suspicious: 'warn'
  },

  // react-refresh is not a native oxlint plugin — use jsPlugins (alpha)
  jsPlugins: ['eslint-plugin-react-refresh'],

  rules: {
    // TypeScript (mirrors @electron-toolkit/eslint-config-ts)
    'typescript/no-explicit-any': 'warn',
    'typescript/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'typescript/explicit-function-return-type': 'off',
    'typescript/explicit-module-boundary-types': 'off',

    // React — prop-types is redundant with TS
    'react/prop-types': 'off',
    'react/display-name': 'warn',

    // react-hooks — part of the react plugin in oxlint
    'react/rules-of-hooks': 'error',
    'react/exhaustive-deps': 'warn',

    // react-refresh — via jsPlugin
    'react-refresh/only-export-components': 'warn'
  }
})
