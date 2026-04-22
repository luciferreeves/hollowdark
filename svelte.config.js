import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

// GitHub Pages serves the project at https://<user>.github.io/<repo>/.
// BASE_PATH is set by the deploy workflow (e.g. '/hollowdark'); during local
// dev it stays empty so the app works at the root.
const BASE_PATH = process.env.BASE_PATH ?? ''

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'dist',
      assets: 'dist',
      fallback: '404.html', // GitHub Pages convention for SPA deep-link fallback
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
      lib: 'ui-lib',
      params: 'params',
      routes: 'routes',
      serviceWorker: 'service-worker.ts'
    },
    alias: {
      engine: 'engine',
      events: 'events',
      'content-system': 'content-system',
      flow: 'flow',
      scene: 'scene',
      memoir: 'memoir',
      birth: 'birth',
      death: 'death',
      continuation: 'continuation',
      worldgen: 'worldgen',
      persistence: 'persistence',
      rng: 'rng',
      time: 'time',
      loading: 'loading',
      'ui-lib': 'ui-lib',
      utils: 'utils',
      content: 'content',
      built: 'built'
    }
  }
}

export default config
