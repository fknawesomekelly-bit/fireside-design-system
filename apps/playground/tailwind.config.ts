import type { Config } from 'tailwindcss'
import firesidePreset from '@fireside/tailwind-preset'

export default {
  presets: [firesidePreset],
  content: [
    './src/**/*.{ts,tsx}',
    '../../packages/components/src/**/*.{ts,tsx}',
  ],
} satisfies Config
