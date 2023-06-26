export default defineNuxtConfig({
	css: [
		'~/assets/playground.css',
	],
	experimental: {
		payloadExtraction: false,
	},
	modules: [
		'../src/module',
	],
	simpleStories: {
		devOnly: false,
	},
	ssr: false,
})
