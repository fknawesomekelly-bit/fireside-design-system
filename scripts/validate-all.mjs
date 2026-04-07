#!/usr/bin/env node
import { execSync } from 'child_process'

const validators = [
  'node scripts/validators/check-deps.mjs',
  'node scripts/validators/check-tokens.mjs',
  'node scripts/validators/check-components.mjs',
]

let failed = false
for (const cmd of validators) {
  try {
    execSync(cmd, { stdio: 'inherit' })
  } catch {
    failed = true
  }
}

if (failed) {
  console.error('\n✗ Validation failed')
  process.exit(1)
}
console.log('\n✓ All validators passed')
