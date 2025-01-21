import { defineConfig } from "vite";
import { viteStaticCopy } from 'vite-plugin-static-copy';


export default defineConfig({
    base: "./",
    build: {
        target: "esnext",
        polyfillDynamicImport: false,
        assetsInclude: 0,
    },

    plugins: [
        viteStaticCopy({
        targets: [{
          src: '**/*.wav',
          dest: 'assets', 
        }],
     }),
    ],
    server: {
        port: 3000,
    },
});