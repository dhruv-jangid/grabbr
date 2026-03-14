import { defineConfig } from 'oxfmt'

export default defineConfig({
  printWidth: 100,
  singleQuote: true,
  semi: false,
  trailingComma: 'none',
  endOfLine: 'lf',
  ignorePatterns: [
    'out',
    'dist',
    'pnpm-lock.yaml',
    'LICENSE.md',
    'tsconfig.json',
    'tsconfig.*.json'
  ]
})
