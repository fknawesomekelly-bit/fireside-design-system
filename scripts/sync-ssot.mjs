/**
 * sync-ssot.mjs — SSOT tokens.json → per-brand md3-tokens.json
 *
 * Phase 4.5: Option C (Parallel emit)
 * Extracts sys.color from SSOT and writes per-brand md3-tokens.json
 * into src/brands/{v2name}/ for Style Dictionary to pick up.
 *
 * CA Decision 2026-04-12: _doolit_example → doolit slug mapping.
 * No _shared/ directory — files go directly into existing brand folders.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/* --- Configuration --------------------------------------- */

const SSOT_DIR = resolve(__dirname, '../../Z-OS Docs/_design-references/data');
const BRANDS_DIR = resolve(__dirname, '../packages/tokens/src/brands');

// SSOT slug → v2 folder name
const SLUG_MAP = {
  '_doolit_example': 'doolit',
  'aventor': 'aventor',
};

/* --- Main ------------------------------------------------ */

function main() {
  console.log('[sync-ssot] Starting SSOT → v2 sync...');
  console.log('[sync-ssot] SSOT dir:', SSOT_DIR);
  console.log('[sync-ssot] Brands dir:', BRANDS_DIR);

  // 1. Read SSOT tokens.json
  const tokensPath = resolve(SSOT_DIR, 'tokens.json');
  if (!existsSync(tokensPath)) {
    console.error('[sync-ssot] ERROR: tokens.json not found at', tokensPath);
    process.exit(1);
  }

  const tokens = JSON.parse(readFileSync(tokensPath, 'utf-8'));
  const ssotBrands = tokens.brands || {};

  // 2. Read SSOT brands.json (for seed fallback)
  const brandsPath = resolve(SSOT_DIR, 'brands.json');
  let brandsData = {};
  if (existsSync(brandsPath)) {
    brandsData = JSON.parse(readFileSync(brandsPath, 'utf-8')).brands || {};
  }

  // 3. Process each mapped brand
  let totalWritten = 0;

  for (const [ssotSlug, v2Name] of Object.entries(SLUG_MAP)) {
    const targetDir = resolve(BRANDS_DIR, v2Name);
    if (!existsSync(targetDir)) {
      console.warn(`[sync-ssot] WARN: v2 brand dir not found, creating: ${v2Name}/`);
      mkdirSync(targetDir, { recursive: true });
    }

    const brandTokens = ssotBrands[ssotSlug];
    const brandInfo = brandsData[ssotSlug];

    // Extract sys.color roles
    const sysColor = brandTokens?.sys?.color;

    if (!sysColor || Object.keys(sysColor).length === 0) {
      // No sys.color in SSOT — generate minimal from seed
      const seed = brandInfo?.seed;
      if (seed) {
        console.log(`[sync-ssot] ${ssotSlug} → ${v2Name}: no sys.color, using seed ${seed} as primary`);
        const md3Tokens = {
          'md-sys-color': {
            'primary': { '$value': seed, '$type': 'color' },
          },
        };
        writeTokenFile(targetDir, v2Name, md3Tokens, 1);
        totalWritten++;
      } else {
        console.warn(`[sync-ssot] WARN: ${ssotSlug} has no sys.color and no seed — skipping`);
      }
      continue;
    }

    // Build md3-tokens.json from sys.color
    const md3Color = {};
    let roleCount = 0;

    for (const [role, entry] of Object.entries(sysColor)) {
      const value = entry?.$value || entry;
      if (typeof value === 'string') {
        md3Color[role] = { '$value': value, '$type': 'color' };
        roleCount++;
      }
    }

    const md3Tokens = { 'md-sys-color': md3Color };
    writeTokenFile(targetDir, v2Name, md3Tokens, roleCount);
    totalWritten++;

    console.log(`[sync-ssot] ${ssotSlug} → ${v2Name}: ${roleCount} sys.color roles extracted`);
  }

  console.log(`[sync-ssot] Done. ${totalWritten} brand(s) processed.`);
}

function writeTokenFile(targetDir, brandName, tokens, count) {
  const outPath = resolve(targetDir, 'md3-tokens.json');
  const content = JSON.stringify(tokens, null, 2) + '\n';
  writeFileSync(outPath, content, 'utf-8');
  console.log(`[sync-ssot] Wrote ${outPath} (${count} tokens)`);
}

main();
