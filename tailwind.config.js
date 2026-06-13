/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream:      '#F9F6F0',
        'cream-mid':'#F0EAE0',
        'cream-dark':'#E4D9C8',
        green: {
          DEFAULT: '#0A3D2E',
          mid:     '#1A5C44',
          light:   '#2E7D58',
          dark:    '#07281F',
          deep:    '#051A14',
        },
        gold: {
          DEFAULT: '#C5A059',
          light:   '#D4B577',
          pale:    '#EDD8A8',
          deep:    '#A07830',
          faint:   '#F5EDD8',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        serif:   ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:    ['DM Sans', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'widest2': '0.35em',
        'widest3': '0.45em',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
      },
      animation: {
        'ticker': 'ticker 35s linear infinite',
        'float':  'float 6s ease-in-out infinite',
        'shimmer':'shimmer 5s linear infinite',
        'pulse-gold': 'pulseGold 2.5s ease-in-out infinite',
        'grain':  'grain 8s steps(10) infinite',
      },
      keyframes: {
        ticker: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-300% center' },
          '100%': { backgroundPosition: '300% center' },
        },
        pulseGold: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(197,160,89,0.4)' },
          '50%':     { boxShadow: '0 0 0 12px rgba(197,160,89,0)' },
        },
        grain: {
          '0%,100%': { transform: 'translate(0,0)' },
          '25%':     { transform: 'translate(2%,3%)' },
          '50%':     { transform: 'translate(-1%,-2%)' },
          '75%':     { transform: 'translate(3%,-1%)' },
        },
      },
    },
  },
  plugins: [],
};
