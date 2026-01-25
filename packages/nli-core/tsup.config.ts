import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    '@radix-ui/react-checkbox',
    '@radix-ui/react-dialog',
    '@radix-ui/react-popover',
    '@radix-ui/react-radio-group',
    '@radix-ui/react-select',
    '@radix-ui/react-slot',
    '@radix-ui/react-switch',
    '@radix-ui/react-toggle',
    '@radix-ui/react-toggle-group',
    'class-variance-authority',
    'clsx',
    'date-fns',
    'lucide-react',
    'react-day-picker',
    'tailwind-merge',
    'cmdk',
  ],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    }
  },
})
