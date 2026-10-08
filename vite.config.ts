import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { PUBLIC_SECURITY_HEADERS } from './src/publicSecurity.mjs';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: { headers: { ...PUBLIC_SECURITY_HEADERS } },
});
