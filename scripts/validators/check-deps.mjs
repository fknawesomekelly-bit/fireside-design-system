#!/usr/bin/env node
import { readFileSync } from 'fs'
import { glob } from 'fs/promises'

const FORBIDDEN = ['@radix-ui/themes', '@mui/material', '@mui/system', 'antd']

const pkgFiles = []
for await (const f of glob('**/package.json', { exclude: (p) => p.includes('node_modules') })) {
  pkgFiles.push(f)
}

let failed = false
for (const file of pkgFiles) {
  const pkg = JSON.parse(readFileSync(file, 'utf-8'))
  const deps = { ...pkg.dependencies, ...pkg.devDependencies, ...pkg.peerDependencies }
  for (const name of Object.keys(deps)) {
    for (const f of FORBIDDEN) {
      if (name === f || name.startsWith(f + '/')) {
        console.error(`✗ Forbidden dependency "${name}" in ${file}`)
        failed = true
      }
    }
  }
}

if (failed) process.exit(1)
console.log(`✓ Dependencies clean (${pkgFiles.length} package.json checked)`)
