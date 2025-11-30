import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'
import { presetUITheme } from './preset-ui-theme'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const collectIconSafelist = () => {
  const pagesDir = path.resolve(__dirname, 'src/pages')
  if (!fs.existsSync(pagesDir)) return []

  const iconSet = new Set<string>()
  const pageDirs = fs.readdirSync(pagesDir)

  pageDirs.forEach((dir) => {
    const configPath = path.join(pagesDir, dir, 'config.yaml')
    if (!fs.existsSync(configPath)) return

    const content = fs.readFileSync(configPath, 'utf8')
    const match = content.match(/icon:\s*['"]?([^'"]+)['"]?/)
    if (match && match[1]) iconSet.add(match[1])
  })

  return Array.from(iconSet)
}

export default defineConfig({
  // Centralized theme tokens for UnoCSS utilities and shortcuts.
  theme: {
    
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetUITheme(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  safelist: collectIconSafelist(),
  content:{
    pipeline:{
      include: [
        './src/**/*.{vue,ts,tsx,js,jsx,yaml}',
      ],
    }
  }
})
