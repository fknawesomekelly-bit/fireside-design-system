import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

const typeScale = [
  { name: 'xs', size: '12px' },
  { name: 'sm', size: '14px' },
  { name: 'base', size: '16px' },
  { name: 'lg', size: '18px' },
  { name: 'xl', size: '20px' },
  { name: '2xl', size: '24px' },
  { name: '3xl', size: '30px' },
  { name: '4xl', size: '36px' },
  { name: '5xl', size: '48px' },
]

function TypeScale() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {typeScale.map(({ name, size }) => (
        <div key={name} style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <span style={{ width: 80, fontSize: 12, fontFamily: 'monospace', flexShrink: 0 }}>
            {name} · {size}
          </span>
          <span style={{ fontSize: size }}>The quick brown fox jumps over the lazy dog</span>
        </div>
      ))}
    </div>
  )
}

const meta: Meta = {
  title: 'Foundations/Typography',
  component: TypeScale,
}
export default meta

type Story = StoryObj
export const Scale: Story = {}
