import tailwindPlaygroundConfig from './tailwind.config'

export default defineNuxtConfig({
	css: [
		'~/assets/styles.css',
	],
	experimental: {
		payloadExtraction: false,
	},
	postcss: {
		plugins: {
			tailwindcss: tailwindPlaygroundConfig,
			autoprefixer: {},
		},
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
