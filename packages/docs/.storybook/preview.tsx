import type { Preview } from '@storybook/react'
import '@fireside/tokens/css/doolit'
import '@fireside/tokens/css/aventor'
import '@fireside/tokens/css/zos'
import './tailwind.css'
import React from 'react'

const preview: Preview = {
  globalTypes: {
    brand: {
      name: 'Brand',
      defaultValue: 'doolit',
      toolbar: { items: ['doolit', 'aventor', 'zos'], showName: true },
    },
    theme: {
      name: 'Theme',
      defaultValue: 'light',
      toolbar: { items: ['light', 'dark'], showName: true },
    },
  },
  decorators: [
    (Story, ctx) => (
      <div data-brand={ctx.globals.brand} data-theme={ctx.globals.theme}>
        <div className="bg-background text-foreground p-8 min-h-screen">
          <Story />
        </div>
      </div>
    ),
  ],
}
export default preview
