import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  
  plugins: [react()],
  server: {
  proxy: {
    "/fsq": {
      target: "https://places-api.foursquare.com",
      changeOrigin: true,
      secure: true,
      rewrite: path => path.replace(/^\/fsq/, ""),
    },
  },
}

})
