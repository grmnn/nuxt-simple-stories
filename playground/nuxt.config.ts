export default defineNuxtConfig({
	css: [
		'/assets/tailwind.css',
	],
	modules: [
		'../src/module',
	],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
})
