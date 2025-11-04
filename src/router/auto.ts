import type { RouteRecordRaw } from 'vue-router'

export function generateRoutes() {
  const pageModules = import.meta.glob('../pages/**/**.vue')
  const configModules = import.meta.glob('../pages/**/config.yaml', {
    eager: true,
    as: 'raw',
  })

  type PageMetaConfig = {
    title?: string
    icon?: string
  }

  const pascalCase = (value: string) =>
    value
      .split(/[-_]/)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('')

  const titleCase = (value: string) =>
    value
      .split(/[-_]/)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ')

  const parseYamlConfig = (raw: string): PageMetaConfig => {
    const result: PageMetaConfig = {}

    raw.split(/\r?\n/).forEach(line => {
      const trimmed = line.trim()

      if (!trimmed || trimmed.startsWith('#')) return

      const [keyPart, ...valueParts] = trimmed.split(':')

      if (!keyPart || valueParts.length === 0) return

      const key = keyPart.trim()
      const rawValue = valueParts.join(':').trim()
      const value = rawValue.replace(/^['"]|['"]$/g, '')

      if (!value) return

      if (key === 'title' || key === 'icon') {
        result[key] = value
      }
    })

    return result
  }
  const routes = Object.entries(pageModules)
    .map<RouteRecordRaw | null>(([path, component]) => {
      const match = path.match(/\.\.\/pages\/([^/]+)\/\1\.vue$/)

      if (!match) return null

      const slug = match[1]
      const rawConfig = configModules[`../pages/${slug}/config.yaml`]
      const config =
        typeof rawConfig === 'string' ? parseYamlConfig(rawConfig) : {}

      const metaTitle =
        config.title && config.title.length > 0 ? config.title : titleCase(slug)
      const metaIcon =
        config.icon && config.icon.length > 0 ? config.icon : undefined

      return {
        path: `/${slug}`,
        name: pascalCase(slug),
        component,
        meta: {
          title: metaTitle,
          ...(metaIcon ? { icon: metaIcon } : {}),
        },
      }
    })
    .filter((route): route is RouteRecordRaw => route !== null)
    .sort((a, b) => a.path.localeCompare(b.path))

  return routes
}
