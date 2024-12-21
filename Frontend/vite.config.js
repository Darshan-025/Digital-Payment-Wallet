// filepath: /c:/Users/User/Desktop/Digital Payment Wallet/Frontend/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
});