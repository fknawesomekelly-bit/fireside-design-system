import type { Meta, StoryObj } from '@storybook/react'
import { Input, Label } from '@fireside/components'
import React from 'react'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
}
export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = { args: { placeholder: 'Enter text...' } }
export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  ),
}
export const Disabled: Story = { args: { placeholder: 'Disabled', disabled: true } }
