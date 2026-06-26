import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [tailwindcss(), react()],
    server: {
      port: 5174,
      open: true,
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return
            if (id.includes('react-pdf') || id.includes('pdf-lib')) return 'vendor-pdf'
            if (id.includes('sweetalert2')) return 'vendor-swal'
            if (id.includes('@heroui') || id.includes('framer-motion')) return 'vendor-ui'
            if (id.includes('@tanstack')) return 'vendor-query'
            if (id.includes('react-hook-form') || id.includes('zod') || id.includes('@hookform')) return 'vendor-form'
            if (id.includes('react-router') || id.includes('react-dom') || id.includes('/react/')) return 'vendor-react'
            return 'vendor'
          },
        },
      },
    },
  }
})
