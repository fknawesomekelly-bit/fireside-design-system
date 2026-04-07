#!/usr/bin/env node
import { readHookInput, normalizePath, block, isFullFileWrite } from './_lib.mjs'

const input = readHookInput()
const filePath = normalizePath(input.tool_input?.file_path || '')

// Only check token JSON files
if (!filePath.match(/packages\/tokens\/src\/.*\.json$/)) process.exit(0)

// CRITICAL FIX (C2): only validate on full-file Write.
// str_replace/Edit produces partial JSON fragments that won't parse.
// Disk state will be re-validated by check-tokens.mjs in pre-commit.
if (!isFullFileWrite(input.tool_name)) process.exit(0)

const content = input.tool_input?.content || ''

let json
try {
  json = JSON.parse(content)
} catch (e) {
  block(`Invalid JSON in ${filePath}: ${e.message}`)
}

// W3C Design Tokens v1.0: leaf nodes need $value AND $type
function validate(obj, path = '') {
  if (typeof obj !== 'object' || obj === null) return []
  const errors = []
  if ('$value' in obj || '$type' in obj) {
    if (!('$value' in obj)) errors.push(`${path}: missing $value`)
    if (!('$type' in obj)) errors.push(`${path}: missing $type`)
    return errors
  }
  for (const key of Object.keys(obj)) {
    errors.push(...validate(obj[key], path ? `${path}.${key}` : key))
  }
  return errors
}

const errors = validate(json)
if (errors.length > 0) {
  block(
    `W3C Design Tokens schema violations in ${filePath}:\n${errors.join('\n')}\n\n` +
    `Reference: github.com/primer/primitives`
  )
}
process.exit(0)
