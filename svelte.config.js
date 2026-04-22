import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

const BASE_PATH = process.env.BASE_PATH ?? ''

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'dist',
      assets: 'dist',
      fallback: '404.html',
      precompress: false,
      strict: true
    }),
    paths: {
      base: BASE_PATH
    },
    files: {
      assets: 'static',
      appTemplate: 'app/app.html',
      hooks: {
        client: 'hooks/client.ts'
      },
      lib: 'lib',
      params: 'params',
      routes: 'routes',
      serviceWorker: 'service-worker.ts'
    },
    alias: {
      '@hollowdark': '.'
    }
  }
}

export default config
