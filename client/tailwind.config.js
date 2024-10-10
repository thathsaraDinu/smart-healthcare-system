/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        blue: {
          50: '#e8f1fd',
          100: '#b6d3fa',
          200: '#93bdf8',
          300: '#629ff4',
          400: '#448df2',
          500: '#1570ef',
          600: '#1366d9',
          700: '#0f50aa',
          800: '#0c3e83',
          900: '#092f64',
        },
        grey: {
          50: '#f0f1f3',
          100: '#d0d3d9',
          200: '#b9bdc7',
          300: '#989fad',
          400: '#858d9d',
          500: '#667085',
          600: '#5d6679',
          700: '#48505e',
          800: '#383e49',
          900: '#2b2f38',
        },
        orange: '#E19133',
        purple: '#845EBC',
        red: {
          DEFAULT: '#F04438',
          50: '#fee8e7',
          100: '#fbc8c5',
          200: '#f6a4a0',
          300: '#f17f7a',
          400: '#ec5e5a',
          500: '#e64542',
          600: '#d53a38',
          700: '#b42f2e',
          800: '#942423',
          900: '#781a1a',
        },
        green: {
          DEFAULT: '#12B76A',
          50: '#e6f4e9',
          100: '#c0e3c7',
          200: '#97d1a2',
          300: '#6bbd7b',
          400: '#4fae5f',
          500: '#3d944d',
          600: '#347e42',
          700: '#285f33',
          800: '#1e4727',
          900: '#15321c',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: ['tailwindcss-animate'],
};
