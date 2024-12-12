import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		sourcemap: process.env.NODE_ENV !== 'production'
	},
	plugins: [sveltekit()],
});
