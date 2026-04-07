#!/usr/bin/env node
import { readFileSync, existsSync } from 'fs'
import { glob } from 'fs/promises'

const ROOT = 'packages/components'

if (!existsSync(`${ROOT}/src`)) {
  console.log(`Skip: ${ROOT}/src does not exist yet`)
  process.exit(0)
}

const files = []
for await (const f of glob(`${ROOT}/src/**/*.{ts,tsx,css}`)) files.push(f)

let failed = false
const hexPattern = /#[0-9a-fA-F]{3,8}\b/

for (const file of files) {
  const content = readFileSync(file, 'utf-8')

  // 1. No hex
  const matches = content.match(hexPattern)
  if (matches) {
    console.error(`✗ Hex in ${file}: ${matches.join(', ')}`)
    failed = true
  }

  // 2. No forbidden imports
  for (const forbidden of ['@radix-ui/themes', '@mui/', "from 'antd'", 'from "antd"']) {
    if (content.includes(forbidden)) {
      console.error(`✗ Forbidden import in ${file}: ${forbidden}`)
      failed = true
    }
  }
}

// 3. Required components exist (only if any components exist at all)
if (files.length > 0) {
  const required = ['button', 'card', 'input']
  for (const name of required) {
    if (!existsSync(`${ROOT}/src/primitives/${name}.tsx`)) {
      console.error(`✗ Missing required component: ${name}.tsx`)
      failed = true
    }
  }
}

if (failed) process.exit(1)
console.log(`✓ Components valid (${files.length} files)`)
