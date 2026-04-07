import type { Meta, StoryObj } from '@storybook/react'
import { Separator } from '@fireside/components'
import React from 'react'

const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  component: Separator,
}
export default meta

type Story = StoryObj<typeof Separator>

export const Horizontal: Story = {
  render: () => (
    <div className="space-y-4 w-[300px]">
      <p className="text-sm">Above separator</p>
      <Separator />
      <p className="text-sm">Below separator</p>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex items-center gap-4 h-8">
      <span className="text-sm">Left</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Right</span>
    </div>
  ),
}
