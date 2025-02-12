import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: ['PublicSans', 'sans-serif'],
      },
      fontWeight: {
        extraLight: '100',
        normal: '400',
        bold: '700',
        extraBold: '800',
      },
    },
  },
  plugins: [],
} satisfies Config
