// eslint.config.js — Flat config for ESLint v9 + Next.js 14
import nextPlugin from '@next/eslint-plugin-next'

export default [
  { ignores: ['.next/**', 'node_modules/**', 'dist/**'] },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: { '@next/next': nextPlugin },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // add your custom rules here if needed
    },
  },
]
