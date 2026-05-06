import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#080808',
        surface: '#111111',
        surface2: '#1a1a1a',
        border: '#2a2a2a',
        gold: '#C9A96E',
        'gold-light': '#d4b882',
        'gold-dim': '#9a7a4a',
        white: '#F5F5F0',
        muted: '#888880',
        accent: '#C9A96E',
        success: '#4CAF7D',
        error: '#E05252',
        warning: '#E09A2B',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
