import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Il sotto-percorso su cui questa landing verrà servita in produzione.
// In dev usiamo '/' per comodità (localhost:5173/).
const LANDING_BASE = '/riscaldamento-pavimento/'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // In dev → '/'  |  In build/preview → '/riscaldamento-pavimento/'
  base: command === 'serve' ? '/' : LANDING_BASE,
  // Espone la variabile a runtime nel codice React (import.meta.env.VITE_BASE_PATH)
  define: {
    'import.meta.env.VITE_BASE_PATH': JSON.stringify(
      command === 'serve' ? '/' : LANDING_BASE
    ),
  },
  build: {
    // Tutto in un unico bundle JS (+ i lazy chunks delle route).
    // Evita micro-chunk da 0.3 KB che creano decine di richieste HTTP
    // e bloccano il rendering con un waterfall di rete.
    rollupOptions: {
      output: {
        // Un solo chunk "vendor" per tutte le librerie esterne
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
}))
