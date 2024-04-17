import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'src': '/src',
      '@mui/styled-engine': '@mui/styled-engine-sc',
    },
  },
})
