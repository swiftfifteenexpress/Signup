import { resolve } from 'path';
import { defineConfig } from 'vite';

// Builds the existing root-level index.html / order.html as-is (no framework,
// no rewrite of markup) into dist/, with CSS/JS minified and content-hashed
// for cache busting. GitHub Pages currently serves the repo root directly,
// so running `npm run build` is optional — the site works with zero build
// step. Point Pages at the `dist/` output (via a GitHub Actions workflow)
// only when you're ready to switch over.
export default defineConfig({
  root: '.',
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        order: resolve(__dirname, 'order.html')
      }
    }
  }
});
