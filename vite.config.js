import { defineConfig } from "vite";

export default defineConfig({
    base: "./",
    build: {
        target: "esnext",
        polyfillDynamicImport: false,
    },
    esbuild: {
        jsxFactory: "h",
        jsxFragment: "Fragment",
    },
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
        "/@/": new URL("./src", import.meta.url).pathname,
        },
    },
});