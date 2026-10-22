import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/admin/**/*.{js,ts,jsx,tsx}',
    './src/components/admin/**/*.{js,ts,jsx,tsx}'
  ],
  corePlugins: {
    // Disable global preflight so Tailwind does not override public site reset/typography
    preflight: false
  },
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink, #173b30)',
        paper: 'var(--paper, #f5f3eb)',
        white: 'var(--white, #fffef9)',
        line: 'var(--line, #d8ddd3)',
        lime: 'var(--lime, #dbe999)',
        muted: 'var(--muted, #5c6a60)',
        error: 'var(--error, #742e27)',
        soft: 'var(--soft, #edf0e7)'
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif']
      },
      spacing: {
        sidebar: 'var(--sidebar, 236px)'
      },
      borderRadius: {
        card: 'var(--radius, 12px)'
      },
      boxShadow: {
        panel: '0 8px 30px #173b3006',
        modal: '0 30px 100px #071e183d'
      }
    }
  },
  plugins: []
};

export default config;
