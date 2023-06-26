export default defineNuxtConfig({
	css: [
		'~/assets/playground.css',
	],
	experimental: {
		payloadExtraction: false,
	},
	modules: [
		'../src/module',
		'@vueuse/nuxt',
		'@pinia/nuxt',
		'nuxt-icon',
	],
	simpleStories: {
		devOnly: false,
	},
	ssr: false,
	imports: {
		autoImport: true,
	},
})
