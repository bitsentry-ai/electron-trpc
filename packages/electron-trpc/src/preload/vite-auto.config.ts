/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vite';

module.exports = defineConfig({
  base: './',
  build: {
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, './autoPreload.ts'),
      name: 'electron-trpc-preload-auto',
      formats: ['cjs'],
      fileName: () => 'preload-auto.cjs',
    },
    outDir: path.resolve(__dirname, '../../dist'),
    rollupOptions: {
      external: ['electron'],
      output: {
        // Force everything into a single file
        inlineDynamicImports: true,
      },
    },
  },
});