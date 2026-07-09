import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Porta fixa: o backend monta o link de recuperação de senha com
    // FRONTEND_URL (padrão http://localhost:5173) — se o Vite cair pra
    // outra porta por conflito, o link do e-mail aponta pro lugar errado.
    port: 5174,
    strictPort: true,
  },
})
