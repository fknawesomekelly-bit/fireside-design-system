import type { Config } from 'tailwindcss'
import firesidePreset from '@fireside/tailwind-preset'

export default {
  presets: [firesidePreset],
  content: [
    './stories/**/*.{ts,tsx}',
    '../../packages/components/src/**/*.{ts,tsx}',
  ],
} satisfies Config
