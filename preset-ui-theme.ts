import { Preset } from 'unocss'

export function presetUITheme(): Preset {
  return {
    name: 'preset-ui-theme',

    /**
     * 注入基础主题 CSS 变量（light + dark）
     */
    preflights: [
      {
        getCSS: () => `
          /* ---------------------------
           * Light Theme
           * --------------------------- */
          :root {
            --ui-white: #ffffff;
            --ui-black: #000000;

            /* Gray Scale */
            --ui-gray-100: #f7f7f8;
            --ui-gray-200: #f0f0f1;
            --ui-gray-300: #e5e7eb;
            --ui-gray-500: #9ca3af;
            --ui-gray-700: #4b5563;
            --ui-gray-900: #1a1a1a;

            /* Semantic */
            --ui-bg: var(--ui-white);
            --ui-bg-soft: var(--ui-gray-100);
            --ui-text: var(--ui-gray-900);
            --ui-text-muted: var(--ui-gray-700);
            --ui-border: var(--ui-gray-300);

            /* Brand Colors */
            --ui-primary: #409eff;
            --ui-primary-hover: #66b1ff;
            --ui-danger: #f56c6c;
            --ui-warning: #e6a23c;

            /* Component Tokens */
            --btn-bg: var(--ui-primary);
            --btn-text: #fff;
            --btn-hover-bg: var(--ui-primary-hover);

            --card-bg: var(--ui-bg);
            --card-border: var(--ui-border);

            --input-bg: var(--ui-bg);
            --input-text: var(--ui-text);
            --input-border: var(--ui-border);
            --input-focus-border: var(--ui-primary);
          }

          /* ---------------------------
           * Dark Theme
           * --------------------------- */
          .dark {
            --ui-white: #ffffff;
            --ui-black: #000000;

            --ui-gray-100: #1f1f20;
            --ui-gray-200: #2a2a2b;
            --ui-gray-300: #3a3a3c;
            --ui-gray-500: #888;
            --ui-gray-700: #999;
            --ui-gray-900: #f2f2f3;

            --ui-bg: #1a1a1a;
            --ui-bg-soft: #1f1f20;
            --ui-text: #f3f3f3;
            --ui-text-muted: #b4b4b4;
            --ui-border: #3a3a3c;

            --ui-primary: #409eff;
            --ui-primary-hover: #66b1ff;
            --ui-danger: #f56c6c;
            --ui-warning: #e6a23c;

            --btn-bg: var(--ui-primary);
            --btn-text: #fff;
            --btn-hover-bg: var(--ui-primary-hover);

            --card-bg: var(--ui-gray-100);
            --card-border: var(--ui-border);

            --input-bg: var(--ui-gray-100);
            --input-text: var(--ui-text);
            --input-border: var(--ui-border);
            --input-focus-border: var(--ui-primary);
          }
        `
      }
    ],

    /**
     * Utility Classes
     * （更优雅的写法，而不是 bg-[var(--ui-bg)]）
     */
    rules: [
      // Semantic Backgrounds
      ['ui-bg', { 'background-color': 'var(--ui-bg)' }],
      ['ui-bg-soft', { 'background-color': 'var(--ui-bg-soft)' }],

      // Text Colors
      ['ui-text', { color: 'var(--ui-text)' }],
      ['ui-text-muted', { color: 'var(--ui-text-muted)' }],

      // Border Colors
      ['ui-border', { 'border-color': 'var(--ui-border)' }],

      // Primary
      ['ui-primary', { color: 'var(--ui-primary)' }],
      ['ui-primary-bg', { 'background-color': 'var(--ui-primary)' }],
      ['ui-primary-hover', { 'background-color': 'var(--ui-primary-hover)' }],

      // Components
      ['btn-bg', { 'background-color': 'var(--btn-bg)' }],
      ['btn-text', { color: 'var(--btn-text)' }],
      ['btn-hover-bg', { 'background-color': 'var(--btn-hover-bg)' }],

      ['card-bg', { 'background-color': 'var(--card-bg)' }],
      ['card-border', { 'border-color': 'var(--card-border)' }],

      ['input-bg', { 'background-color': 'var(--input-bg)' }],
      ['input-text', { color: 'var(--input-text)' }],
      ['input-border', { 'border-color': 'var(--input-border)' }],
      ['input-focus-border', { 'border-color': 'var(--input-focus-border)' }]
    ],

    /**
     * Variants（扩展 dark:）
     */
    variants: [
      (matcher) => {
        if (matcher.startsWith('dark:'))
          return {
            matcher: matcher.slice(5),
            selector: (s) => `.dark ${s}`,
          }
      }
    ]
  }
}
