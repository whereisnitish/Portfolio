/** @type {import('tailwindcss').Config} */

/**
 * A deliberately small system.
 *
 * One neutral ink scale, one accent, one hairline. Colours are CSS custom
 * properties so light and dark are the same classes with different values —
 * there are no `dark:` variants anywhere in the components.
 *
 * There is no shadow scale and no gradient: elevation is expressed with
 * hairlines and whitespace instead.
 */
const rgb = (name) => `rgb(var(${name}) / <alpha-value>)`

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: rgb('--bg'),
        // The single tinted surface, used sparingly to group dense content.
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
        display: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        label: '0.16em',
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
      },
      animation: {
        caret: 'caret 1.1s step-end infinite',
      },
    },
  },
  plugins: [],
}
