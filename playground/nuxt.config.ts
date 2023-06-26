export default defineNuxtConfig({
	css: [
		'~/assets/playground.css',
	],
	modules: [
		'../src/module',
	],
	simpleStories: {
		devOnly: false,
	},
})
