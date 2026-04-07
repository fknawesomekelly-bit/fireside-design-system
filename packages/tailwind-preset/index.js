export default {
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-semantic-background)',
        foreground: 'var(--color-semantic-foreground)',
        border: 'var(--color-semantic-border)',
        primary: {
          DEFAULT: 'var(--color-semantic-primary)',
          foreground: 'var(--color-semantic-primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--color-semantic-secondary)',
          foreground: 'var(--color-semantic-secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--color-semantic-accent)',
          foreground: 'var(--color-semantic-accent-foreground)',
        },
        muted: {
          DEFAULT: 'var(--color-semantic-muted)',
          foreground: 'var(--color-semantic-muted-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--color-semantic-destructive)',
          foreground: 'var(--color-semantic-destructive-foreground)',
        },
        success: 'var(--color-semantic-success)',
        warning: 'var(--color-semantic-warning)',
        info: 'var(--color-semantic-info)',
      },
    },
  },
}
