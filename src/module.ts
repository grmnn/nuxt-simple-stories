import { fileURLToPath } from 'node:url'
import { addComponentsDir, addLayout, addTemplate, createResolver, defineNuxtModule, extendPages } from '@nuxt/kit'

export interface ModuleOptions {
	/**
   * Set to false to deploy stories to production.
   *
   * @default true
   */
	devOnly: boolean
}

export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: 'nuxt-simple-stories',
		version: '0.0.1',
		configKey: 'simpleStories',
	},
	defaults: {
		devOnly: true,
	},
	async setup(options, nuxt) {
		if (options.devOnly && !nuxt.options.dev)
			return
		const resolver = createResolver(import.meta.url)

		nuxt.options.css.push(resolver.resolve('./runtime/styles.css'))

		const componentsDir = fileURLToPath(new URL('./runtime/components', import.meta.url))

		await addComponentsDir({
			path: resolver.resolve(componentsDir),
			pathPrefix: false,
			pattern: '**/*.vue',
			transpile: true,
		})

		const layoutsDir = fileURLToPath(new URL('./runtime/layouts', import.meta.url))
		const layoutTemplate = addTemplate({
			src: resolver.resolve(layoutsDir, 'story-layout.vue'),
			write: true,
		})
		addLayout(layoutTemplate, 'story-layout')

		const pagesDir = fileURLToPath(new URL('./runtime/pages', import.meta.url))
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
				name: 'nuxt-simple-stories',
				// title to display in the tab
				title: 'Simple Stories',
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
