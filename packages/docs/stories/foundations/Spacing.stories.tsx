import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

const spacingScale = [
  { name: '1', value: '4px' },
  { name: '2', value: '8px' },
  { name: '3', value: '12px' },
  { name: '4', value: '16px' },
  { name: '5', value: '20px' },
  { name: '6', value: '24px' },
  { name: '8', value: '32px' },
  { name: '10', value: '40px' },
  { name: '12', value: '48px' },
  { name: '16', value: '64px' },
]

function SpacingScale() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {spacingScale.map(({ name, value }) => (
        <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ width: 80, fontSize: 12, fontFamily: 'monospace' }}>spacing-{name}</span>
          <div
            style={{
              width: value,
              height: 24,
              borderRadius: 4,
              backgroundColor: 'var(--color-semantic-primary)',
            }}
          />
          <span style={{ fontSize: 12, fontFamily: 'monospace', opacity: 0.5 }}>{value}</span>
        </div>
      ))}
    </div>
  )
}

const meta: Meta = {
  title: 'Foundations/Spacing',
  component: SpacingScale,
}
export default meta

type Story = StoryObj
export const Scale: Story = {}
