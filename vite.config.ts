import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [sveltekit()],
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
