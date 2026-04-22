import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import pkg from './package.json' with { type: 'json' }

export default defineConfig({
  plugins: [sveltekit()],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version)
  },
  test: {
    include: ['tests/**/*.{test,spec}.ts', '**/*.{test,spec}.ts'],
    exclude: ['node_modules', '.svelte-kit', 'dist', 'build'],
    environment: 'node'
  },
  server: {
    port: 5173,
    strictPort: false
  },
  preview: {
    port: 4173
  }
})
