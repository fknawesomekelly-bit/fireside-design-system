#!/usr/bin/env node
import { readHookInput, normalizePath, block, extractWriteContents } from './_lib.mjs'

const input = readHookInput()
const filePath = normalizePath(input.tool_input?.file_path || input.tool_input?.path || '')

// Only check component files
if (!filePath.match(/packages\/components\/src\/.*\.(tsx?|jsx?|css)$/)) {
  process.exit(0)
}

const contents = extractWriteContents(input.tool_input)
const hexPattern = /#[0-9a-fA-F]{3,8}\b/g

for (const content of contents) {
  const matches = content.match(hexPattern)
  if (matches) {
    block(
      `Hex value(s) ${matches.join(', ')} found in ${filePath}.\n` +
      `Components must use semantic tokens (e.g. 'bg-primary', 'text-foreground').\n` +
      `Move colors to packages/tokens/src/brands/*/colors.json.`
    )
  }
}
process.exit(0)
