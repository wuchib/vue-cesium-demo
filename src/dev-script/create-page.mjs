#!/usr/bin/env node
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
if (!args.length) {
  console.error('Usage: npm run page <page-name>');
  process.exit(1);
}

const pageName = args[0].trim();
if (!pageName) {
  console.error('Page name cannot be empty.');
  process.exit(1);
}

if (!/^[a-zA-Z0-9_-]+$/.test(pageName)) {
  console.error('Page name must only include letters, numbers, "-" or "_" characters.');
  process.exit(1);
}

const projectRoot = process.cwd();
const pagesRoot = path.resolve(projectRoot, 'src', 'pages');
const pageDir = path.resolve(pagesRoot, pageName);
const vueFile = path.join(pageDir, `${pageName}.vue`);
const typeFile = path.join(pageDir, 'type.ts');
const componentDir = path.join(pageDir, 'com');
const hookDir = path.join(pageDir, 'hook');

if (existsSync(pageDir)) {
  console.error(`Page "${pageName}" already exists at ${path.relative(projectRoot, pageDir)}.`);
  process.exit(1);
}

mkdirSync(componentDir, { recursive: true });
mkdirSync(hookDir, { recursive: true });

const vueTemplate = `<template>
  <div class="${pageName}-page">
    ${pageName} page content
  </div>
</template>

<script setup lang="ts">
// TODO: add page logic here
</script>

<style scoped>
.${pageName}-page {
}
</style>
`;

const typeTemplate = `export interface ${camelToPascal(pageName)}State {
  // TODO: describe state types here
}
`;

writeFileSync(vueFile, vueTemplate, { flag: 'wx' });
writeFileSync(typeFile, typeTemplate, { flag: 'wx' });

['.gitkeep'].forEach((fileName) => {
  writeFileSync(path.join(componentDir, fileName), '', { flag: 'wx' });
  writeFileSync(path.join(hookDir, fileName), '', { flag: 'wx' });
});

console.log(`Created page package at ${path.relative(projectRoot, pageDir)}`);

function camelToPascal(name) {
  if (!name) return 'PageState';
  const pascal = name
    .split(/[-_]+/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join('');
  const sanitized = pascal.replace(/[^A-Za-z0-9]/g, '');
  if (!sanitized) return 'PageState';
  if (/^[A-Za-z]/.test(sanitized)) {
    return sanitized;
  }
  return `Page${sanitized}`;
}
