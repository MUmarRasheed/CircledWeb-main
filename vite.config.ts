import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['/assets/HowItWorks.png']
    }
  },
  base: '/' // 
//  Adjust the base URL if deploying to a subdirectory
})
