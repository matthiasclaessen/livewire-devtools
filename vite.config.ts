import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
    // Set the Vue project's root directory
    root: resolve(__dirname, 'src/devtools'),
    plugins: [vue()],
    build: {
        // Output the built files to the extension's devtools folder
        outDir: resolve(__dirname, 'shells/chrome/devtools'),
        emptyOutDir: true, // Clean the output directory on each build
        rollupOptions: {
            input: {
                // Use index.html in src/devtools as the entry point
                index: resolve(__dirname, 'src/devtools/index.html')
            }
        }
    },
    resolve: {
        alias: {
            // Create an alias for simpler imports in your Vue project
            '@': resolve(__dirname, 'src/devtools')
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                // Optionally inject global SCSS variables or mixins into every file:
                // additionalData: `@import "@/styles/global.scss";`
            }
        }
    }
})
