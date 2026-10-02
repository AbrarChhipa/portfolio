/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vscode: {
          bg: 'var(--bg)',
          bg2: 'var(--bg2)',
          bg3: 'var(--bg3)',
          bg4: 'var(--bg4)',
          title: 'var(--title)',
          border: 'var(--border)',
          text: 'var(--text)',
          dim: 'var(--dim)',
          bright: 'var(--bright)',
          blue: 'var(--blue)',
          blue2: 'var(--blue2)',
          green: 'var(--green)',
          gcm: 'var(--gcm)',
          yellow: 'var(--yellow)',
          orange: 'var(--orange)',
          purple: 'var(--purple)',
          pink: 'var(--pink)',
          red: 'var(--red)',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['Syne', 'sans-serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
