import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

const semanticColors = [
  'background', 'foreground', 'primary', 'primary-foreground',
  'secondary', 'secondary-foreground', 'accent', 'accent-foreground',
  'muted', 'muted-foreground', 'border',
  'destructive', 'destructive-foreground', 'success', 'warning', 'info',
]

function ColorGrid() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
      {semanticColors.map((name) => (
        <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div
            style={{
              width: '100%',
              height: 64,
              borderRadius: 8,
              backgroundColor: `var(--color-semantic-${name})`,
              border: '1px solid var(--color-semantic-border)',
            }}
          />
          <span style={{ fontSize: 12, fontFamily: 'monospace' }}>{name}</span>
        </div>
      ))}
    </div>
  )
}

const meta: Meta = {
  title: 'Foundations/Colors',
  component: ColorGrid,
}
export default meta

type Story = StoryObj
export const Semantic: Story = {}
