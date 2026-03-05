import tailwindcss from '@tailwindcss/vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		svelte({
			inspector: true
		})
	],
	server: {
		proxy: {
			'/api': 'http://127.0.0.1:8081'
		}
	}
});
