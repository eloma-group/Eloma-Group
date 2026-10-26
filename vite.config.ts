import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/* Homepage plus the static country landing pages */
const PAGES = ['australia', 'united-states', 'canada', 'united-kingdom', 'new-zealand']

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        ...Object.fromEntries(PAGES.map(p => [p, `${p}/index.html`])),
      },
    },
  },
})
