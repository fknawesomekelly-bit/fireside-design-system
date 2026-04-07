#!/usr/bin/env node
import { readdirSync, readFileSync, existsSync } from 'fs'
import { glob } from 'fs/promises'  // Node 22+ native
import { execSync } from 'child_process'

const ROOT = 'packages/tokens'

if (!existsSync(`${ROOT}/src`)) {
  console.log(`Skip: ${ROOT}/src does not exist yet`)
  process.exit(0)
}

// 1. 디렉토리 구조
const required = [
  `${ROOT}/src/primitive`,
  `${ROOT}/src/semantic`,
  `${ROOT}/src/brands`,
  `${ROOT}/style-dictionary.config.mjs`,
]
const missing = required.filter(p => !existsSync(p))
if (missing.length > 0) {
  console.error(`✗ Missing: ${missing.join(', ')}`)
  process.exit(1)
}

// 2. 브랜드 존재
const brands = readdirSync(`${ROOT}/src/brands`).filter(b => !b.startsWith('_') && !b.startsWith('.'))
if (brands.length === 0) {
  console.error(`✗ No brands defined in ${ROOT}/src/brands`)
  process.exit(1)
}

// 3. 모든 브랜드가 colors.json + 동일 semantic 키
const keySets = []
for (const brand of brands) {
  const path = `${ROOT}/src/brands/${brand}/colors.json`
  if (!existsSync(path)) {
    console.error(`✗ Brand "${brand}" missing colors.json`)
    process.exit(1)
  }
  const json = JSON.parse(readFileSync(path, 'utf-8'))
  const semantic = json.color?.semantic
  if (!semantic) {
    console.error(`✗ Brand "${brand}" missing color.semantic`)
    process.exit(1)
  }
  keySets.push({ brand, keys: new Set(Object.keys(semantic)) })
}

const ref = keySets[0]
let keysFailed = false
for (let i = 1; i < keySets.length; i++) {
  const miss = [...ref.keys].filter(k => !keySets[i].keys.has(k))
  const extra = [...keySets[i].keys].filter(k => !ref.keys.has(k))
  if (miss.length || extra.length) {
    console.error(`✗ Brand "${keySets[i].brand}" semantic keys mismatch with "${ref.brand}":`)
    if (miss.length) console.error(`  Missing: ${miss.join(', ')}`)
    if (extra.length) console.error(`  Extra: ${extra.join(', ')}`)
    keysFailed = true
  }
}
if (keysFailed) process.exit(1)

// 4. W3C 스키마 검증 (모든 토큰 JSON, 디스크 상태)
const tokenFiles = []
for await (const f of glob(`${ROOT}/src/**/*.json`)) tokenFiles.push(f)

function validateW3C(obj, path = '') {
  if (typeof obj !== 'object' || obj === null) return []
  const errors = []
  if ('$value' in obj || '$type' in obj) {
    if (!('$value' in obj)) errors.push(`${path}: missing $value`)
    if (!('$type' in obj)) errors.push(`${path}: missing $type`)
    return errors
  }
  for (const key of Object.keys(obj)) {
    errors.push(...validateW3C(obj[key], path ? `${path}.${key}` : key))
  }
  return errors
}

let totalErrors = 0
for (const file of tokenFiles) {
  const errors = validateW3C(JSON.parse(readFileSync(file, 'utf-8')))
  if (errors.length > 0) {
    console.error(`${file}:`)
    errors.forEach(e => console.error(`  ${e}`))
    totalErrors += errors.length
  }
}
if (totalErrors > 0) {
  console.error(`✗ W3C violations: ${totalErrors}`)
  process.exit(1)
}

// 5. Style Dictionary 빌드 검증 (의존성이 설치된 경우만)
if (existsSync(`${ROOT}/node_modules/style-dictionary`)) {
  try {
    execSync('pnpm --filter @fireside/tokens build', { stdio: 'pipe' })
  } catch (e) {
    console.error('✗ Style Dictionary build failed')
    console.error(e.stdout?.toString() || e.message)
    process.exit(1)
  }
}

console.log(`✓ Tokens valid (${brands.length} brands, ${tokenFiles.length} files)`)
