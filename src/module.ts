import { fileURLToPath } from 'node:url'
import { addComponentsDir, addLayout, addTemplate, createResolver, defineNuxtModule, extendPages } from '@nuxt/kit'

export default defineNuxtModule({
	meta: {
		name: 'nuxt-story',
	},
	async setup(_options, nuxt) {
		if (!nuxt.options.dev)
			return
		const resolver = createResolver(import.meta.url)

		nuxt.options.css.push(resolver.resolve('./runtime/styles.css'))

		const componentsDir = fileURLToPath(new URL('./components', import.meta.url))

		await addComponentsDir({
			path: resolver.resolve(componentsDir),
			pathPrefix: false,
			pattern: '**/*.vue',
			transpile: true,
		})

		const layoutsDir = fileURLToPath(new URL('./layouts', import.meta.url))
		const layoutTemplate = addTemplate({
			src: resolver.resolve(layoutsDir, 'story-layout.vue'),
			write: true,
		})
		addLayout(layoutTemplate, 'story-layout')

		const pagesDir = fileURLToPath(new URL('./pages', import.meta.url))
		extendPages((pages) => {
			pages.push({
				name: 'Story',
				path: '/story',
				file: resolver.resolve(pagesDir, 'story.vue'),
			})
		})

		// @ts-expect-error - devtools hook
		nuxt.hook('devtools:customTabs', (tabs: object[]) => {
			tabs.push({
				// unique identifier
				name: 'nuxt-story',
				// title to display in the tab
				title: 'Story',
				// any icon from Iconify, or a URL to an image
				icon: 'carbon:apps',
				// iframe view
				view: {
					type: 'iframe',
					src: '/story',
				},
			})
		})
	},
})
