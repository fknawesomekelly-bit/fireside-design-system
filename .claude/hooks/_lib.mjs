// Hook helper utilities
import { readFileSync } from 'fs'

export function readHookInput() {
  try {
    return JSON.parse(readFileSync(0, 'utf-8'))
  } catch {
    process.exit(0) // Empty/invalid input → don't block
  }
}

export function normalizePath(p) {
  if (!p) return ''
  return p.replace(/\\/g, '/') // Windows backslashes → forward
}

export function block(reason) {
  console.error(JSON.stringify({ decision: 'block', reason }))
  process.exit(2)
}

// Extract all string content from a tool input, regardless of tool type.
// Handles: Write (content), Edit (new_string), MultiEdit (edits[].new_string)
export function extractWriteContents(toolInput) {
  if (!toolInput) return []
  const out = []
  if (typeof toolInput.content === 'string') out.push(toolInput.content)
  if (typeof toolInput.new_string === 'string') out.push(toolInput.new_string)
  if (Array.isArray(toolInput.edits)) {
    for (const e of toolInput.edits) {
      if (typeof e?.new_string === 'string') out.push(e.new_string)
    }
  }
  return out
}

// Is this a full-file Write (vs partial edit)?
export function isFullFileWrite(toolName) {
  return toolName === 'Write' || toolName === 'create_file'
}
