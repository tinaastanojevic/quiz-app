import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    proxy:{
      "/api":{
        target: "https://opentdb.com",
        changeOrigin:true,
        rewrite:(path)=>path.replace(/^\/api/, ""),
      }
    },
    watch: {
      // Ignoriši promene u data.json fajlu
      ignored: ['**/data.json']
    }
  }
})
