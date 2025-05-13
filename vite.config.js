import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // mobile view 
  server:{
    host:"0.0.0.0",
    fs:{
      strict:false,
    },
  },
  plugins: [react()],
  base:process.env.VITE_BASE_PATH || "/Coders-Gym" ,
})