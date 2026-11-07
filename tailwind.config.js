/** @type {import('tailwindcss').Config} */

/**
 * Two worlds, one set of classes.
 *
 * Colours and display type are CSS custom properties, so the Notebook and the
 * GPU Room are the same markup with different values. There are no `dark:`
 * variants in the components. See the tokens at the top of index.css.
 */
const rgb = (name) => `rgb(var(${name}) / <alpha-value>)`

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: rgb('--bg'),
        surface: rgb('--bg-surface'),
        ink: {
          strong: rgb('--ink-strong'),
          body: rgb('--ink-body'),
          muted: rgb('--ink-muted'),
          faint: rgb('--ink-faint'),
        },
        accent: rgb('--accent'),
        'on-accent': rgb('--on-accent'),
      },

      borderColor: {
        DEFAULT: 'var(--line)',
        line: 'var(--line)',
        'line-strong': 'var(--line-strong)',
      },
      divideColor: {
        line: 'var(--line)',
      },

      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: 'var(--font-display)',
        hand: ['Kalam', 'Segoe Print', 'cursive'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        label: '0.14em',
      },
      maxWidth: {
        // A comfortable measure for running text.
        measure: '68ch',
      },

      keyframes: {
        caret: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '30%': { transform: 'rotate(-2.5deg)' },
          '70%': { transform: 'rotate(2deg)' },
        },
      },
      animation: {
        caret: 'caret 1.1s step-end infinite',
        wiggle: 'wiggle 320ms ease-in-out',
      },
    },
  },
  plugins: [],
}
