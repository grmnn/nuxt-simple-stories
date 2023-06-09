export default defineNuxtConfig({
	css: [
		'/assets/tailwind.css',
	],
	modules: [
		'../src/module',
	],
	simpleStories: {
		devOnly: false,
	},
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
})
