import StyleDictionary from 'style-dictionary'
import { readdirSync } from 'fs'

const brands = readdirSync('./src/brands').filter(b => !b.startsWith('_') && !b.startsWith('.'))

const sharedSources = [
  'src/primitive/**/*.json',
  'src/semantic/**/*.json',
  'src/component/**/*.json',
]

for (const brand of brands) {
  const sdLight = new StyleDictionary({
    source: [...sharedSources, `src/brands/${brand}/colors.json`],
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: 'build/css/',
        files: [{
          destination: `${brand}.css`,
          format: 'css/variables',
          options: { selector: `:root[data-brand="${brand}"]` },
        }],
      },
      js: {
        transformGroup: 'js',
        buildPath: 'build/js/',
        files: [{ destination: `${brand}.js`, format: 'javascript/es6' }],
      },
    },
  })
  await sdLight.buildAllPlatforms()

  const sdDark = new StyleDictionary({
    source: [...sharedSources, `src/brands/${brand}/colors.dark.json`],
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: 'build/css/',
        files: [{
          destination: `${brand}.dark.css`,
          format: 'css/variables',
          options: { selector: `:root[data-brand="${brand}"][data-theme="dark"]` },
        }],
      },
    },
  })
  await sdDark.buildAllPlatforms()
}

console.log(`✓ Built tokens for: ${brands.join(', ')}`)
