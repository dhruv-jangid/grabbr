import { resolve } from 'path'
import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(function ({ command }) {
  const onBuild = command === 'build'

  return {
    main: {
      json: { stringify: true },
      build: {
        minify: 'terser',
        terserOptions: {
          compress: {
            drop_console: onBuild,
            drop_debugger: onBuild,
            passes: 2,
            collapse_vars: true,
            reduce_vars: true,
            dead_code: true,
            unused: true,
            toplevel: true,
            join_vars: true,
            conditionals: true,
            comparisons: true,
            evaluate: true,
            booleans: true,
            loops: true,
            arguments: true,
            arrows: true,
            keep_fargs: false,
            properties: true,
            computed_props: true,
            if_return: true,
            switches: true,
            global_defs: onBuild ? { 'is.dev': false } : {}
          },
          mangle: { toplevel: onBuild },
          format: { comments: false }
        },
        rollupOptions: { output: { format: 'es' } }
      }
    },
    preload: {
      json: { stringify: true },
      build: {
        minify: 'terser',
        terserOptions: {
          compress: {
            drop_console: onBuild,
            drop_debugger: onBuild,
            passes: 2,
            collapse_vars: true,
            reduce_vars: true,
            dead_code: true,
            unused: true,
            toplevel: true,
            join_vars: true,
            conditionals: true,
            comparisons: true,
            evaluate: true,
            booleans: true,
            loops: true,
            arguments: true,
            arrows: true,
            keep_fargs: false,
            properties: true,
            computed_props: true,
            if_return: true,
            switches: true,
            global_defs: onBuild ? { 'is.dev': false } : {}
          },
          mangle: { toplevel: onBuild },
          format: { comments: false }
        },
        rollupOptions: { output: { format: 'es' } }
      }
    },
    renderer: {
      json: { stringify: true },
      build: {
        cssMinify: 'lightningcss',
        minify: 'terser',
        terserOptions: {
          compress: {
            drop_console: onBuild,
            drop_debugger: onBuild,
            passes: 2,
            collapse_vars: true,
            reduce_vars: true,
            dead_code: true,
            unused: true,
            toplevel: true,
            join_vars: true,
            conditionals: true,
            comparisons: true,
            evaluate: true,
            booleans: true,
            loops: true,
            arguments: true,
            arrows: true,
            keep_fargs: false,
            properties: true,
            computed_props: true,
            if_return: true,
            switches: true
          },
          mangle: { toplevel: onBuild },
          format: { comments: false }
        },
        rollupOptions: { output: { format: 'es' } }
      },
      server: { port: 3000, strictPort: true },
      resolve: { alias: { '@renderer': resolve('src/renderer/src') } },
      plugins: [tailwindcss({ optimize: true }), react()]
    }
  }
})
