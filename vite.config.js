import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Vite only exposes VITE_-prefixed vars to client code. The Vercel project
  // defines the key as WEB3FORMS_KEY, so that prefix is allowed through as
  // well. Kept narrow on purpose: widening this to "" would leak every
  // server-side variable into the bundle.
  envPrefix: ["VITE_", "WEB3FORMS_"],
  build: {
    target: 'es2020',
    sourcemap: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1100,
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'framer':       ['framer-motion'],
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
  },
  esbuild: { legalComments: 'none' }
})
