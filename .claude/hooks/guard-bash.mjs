#!/usr/bin/env node
import { readHookInput, block } from './_lib.mjs'

const FORBIDDEN = [
  { pattern: /@radix-ui\/themes/, reason: 'Radix Themes conflicts with shadcn/ui' },
  { pattern: /(?<!\w)@mui\//, reason: 'Material UI conflicts with shadcn pattern' },
  { pattern: /(?<!\w)antd(?!\w)/, reason: 'Ant Design conflicts with shadcn pattern' },
  { pattern: /--no-verify\b/, reason: 'Bypassing pre-commit hooks is not allowed' },
  { pattern: /\bgit\s+commit\s+[^\n]*\s-n\b/, reason: 'Bypassing pre-commit hooks is not allowed' },
]

const input = readHookInput()
const command = input.tool_input?.command || ''

for (const { pattern, reason } of FORBIDDEN) {
  if (pattern.test(command)) {
    block(`Command blocked: ${reason}\nCommand: ${command}`)
  }
}
process.exit(0)
