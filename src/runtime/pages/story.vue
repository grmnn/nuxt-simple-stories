<script setup lang="ts">
import type { Component } from '@nuxt/schema'

import type { IStory, ITreeItem } from '../types'
import { computed, defineAsyncComponent, definePageMeta, onMounted, onUnmounted, ref, useRoute, useRouter } from '#imports'

definePageMeta({
	layout: 'story-layout',
})

const showMenu = ref(false)

const computedMenuClass = computed(() => {
	return {
		'translate-x-0': showMenu.value,
		'-translate-x-full lg:nxs-translate-x-0': !showMenu.value,
	}
})

const storyModules = await import.meta.glob('/stories/**/*.story.vue') as Record<string, () => Promise<Component>>

const storiesTree = ref<ITreeItem | {}>({})
const stories = ref<IStory[]>([])

for (const storyPath in storyModules) {
	const storyPathParts = storyPath.split('/').splice(2)
	const storyTitle = storyPathParts.slice(-1)[0].split('.')[0]

	let currentTree = storiesTree.value as ITreeItem
	for (let i = 0; i < storyPathParts.length; i++) {
		const pathPart = storyPathParts[i]
		const isFolder = !pathPart.includes('.vue')

		if (!currentTree.children && isFolder) {
			currentTree.children = []
		}

		let folder = currentTree.children?.find(child => child.name === pathPart)
		if (!folder && isFolder) {
			folder = {
				name: pathPart,
				children: [],
			}
			if (currentTree.children) {
				currentTree.children.push(folder)
			}
		} else if (!isFolder) {
			const storyEntr = {
				name: storyTitle,
				component: storyPath,
			}

			if (!currentTree.children) {
				currentTree.children = []
			}
			currentTree.children!.push(storyEntr)
		}

		if (isFolder && folder) {
			currentTree = folder
		}
	}

	stories.value.push({
		name: storyTitle,
		component: storyPath,
	})
}
const selectedStory = ref<IStory>()

const computedStoryComponent = computed(() => {
	if (!selectedStory.value) {
		return
	}
	const storyComponent = defineAsyncComponent(storyModules[selectedStory.value.component])
	return storyComponent
})

const router = useRouter()
const route = useRoute()

function setComponent(story: IStory) {
	selectedStory.value = story
	router.push(`?component=${story.name}`)
	showMenu.value = false
}

const openTree = ref(true)

onMounted(() => {
	console.log(document.documentElement.classList)
	document.documentElement.classList.add('nxs')
	const story = stories.value.find(story => story.name === route.query.component)

	if (story) {
		setComponent(story)
		return
	}

	setComponent(stories.value[0])
})

onUnmounted(() => {
	document.documentElement.classList.remove('nxs')
})

const computedActiveFile = computed(() => {
	return route.query.component as string || null
})
</script>

<template>
  <div class="nxs-absolute nxs-flex nxs-h-full nxs-w-full nxs-flex-col nxs-overflow-hidden">
    <div class="nxs-relative nxs-flex nxs-h-full nxs-w-full nxs-shrink-0 nxs-overflow-hidden">
      <aside
        class="nxs-fixed nxs-z-50 nxs-h-full nxs-min-w-[320px] nxs-border-r nxs-border-neutral-600 nxs-bg-black nxs-pt-12 nxs-transition lg:nxs-relative lg:nxs-inset-y-auto lg:nxs-left-auto"
        :class="computedMenuClass"
      >
        <ul v-if="computedActiveFile">
          <TreeItem
            :active-file="computedActiveFile"
            :item="storiesTree"
            :open="openTree"
            :level="0"
            @select-file="setComponent"
          />
        </ul>
      </aside>

      <main class="nxs-relative nxs-flex nxs-h-full nxs-grow nxs-basis-0 nxs-flex-col nxs-overflow-y-auto nxs-px-4 nxs-pt-8 lg:nxs-px-12 lg:nxs-pt-12">
        <h1
          v-if="selectedStory"
          class="nxs-mb-12 nxs-text-4xl nxs-font-semibold nxs-text-white"
        >
          {{ selectedStory.name }}
        </h1>
        <Transition
          mode="out-in"
          name="fade"
        >
          <div
            v-if="computedStoryComponent"
            class="nxs:space-y-4 lg:nxs-space-y-16"
          >
            <component :is="computedStoryComponent" />
          </div>
        </Transition>
      </main>
    </div>
    <button
      class="nxs-fixed nxs-bottom-6 nxs-right-6 nxs-z-10 nxs-flex nxs-h-10 nxs-w-10 nxs-items-center nxs-justify-center nxs-rounded nxs-border-2 nxs-border-black nxs-bg-white nxs-text-xl nxs-text-black lg:nxs-hidden"
      @click="showMenu = !showMenu"
    >
      O
    </button>
  </div>
</template>
