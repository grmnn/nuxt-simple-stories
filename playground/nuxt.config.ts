export default defineNuxtConfig({
	css: [
		'~/assets/playground.css',
	],
	modules: [
		'../src/module',
		'@nuxt/devtools',
	],
	simpleStories: {
		devOnly: false,
	},
})
