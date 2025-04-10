import { defineConfig } from 'vite'
import Icons from 'unplugin-icons/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ["babel-plugin-react-compiler", {}]
        ]
      }
    }),
    Icons({
      compiler: "jsx",
      scale: 1.5,
    })
  ],
})
