import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: 'rgb(var(--brand) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
      },
      borderRadius: { xl: 'var(--radius)' },
      boxShadow: { soft: '0 8px 24px rgba(0,0,0,.06)' },
    },
  },
  plugins: [],
}
export default config