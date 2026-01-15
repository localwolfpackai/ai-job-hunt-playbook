/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--background)',
        surface: 'var(--surface)',
        text: 'var(--text-primary)',
        muted: 'var(--text-muted)',
        accentStart: 'var(--accent-start)',
        accentMiddle: 'var(--accent-middle)',
        accentEnd: 'var(--accent-end)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', '"Fira Code"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        soft: '0 8px 32px rgba(0, 0, 0, 0.18)',
      },
    },
  },
  plugins: [],
}
