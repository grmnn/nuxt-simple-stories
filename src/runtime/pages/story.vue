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
		'-translate-x-full lg:translate-x-0': !showMenu.value,
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
	document.documentElement.classList.add('nx-story')
	const story = stories.value.find(story => story.name === route.query.component)

	if (story) {
		setComponent(story)
		return
	}

	setComponent(stories.value[0])
})

onUnmounted(() => {
	document.documentElement.classList.remove('nx-story')
})

const computedActiveFile = computed(() => {
	return route.query.component as string || null
})
</script>

<template>
  <div class="absolute flex h-full w-full flex-col overflow-hidden">
    <div class="relative flex h-full w-full shrink-0 overflow-hidden">
      <aside
        class="fixed z-50 h-full min-w-[320px] border-r border-gray-2 bg-black pt-12 transition lg:relative lg:inset-y-auto lg:left-auto"
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

      <main class="relative flex h-full grow basis-0 flex-col overflow-y-auto px-4 pt-8 lg:px-12 lg:pt-12">
        <h1
          v-if="selectedStory"
          class="mb-12 text-4xl font-semibold text-white"
        >
          {{ selectedStory.name }}
        </h1>
        <Transition
          mode="out-in"
          name="fade"
        >
          <div
            v-if="computedStoryComponent"
            class="space-y-4 lg:space-y-16"
          >
            <component :is="computedStoryComponent" />
          </div>
        </Transition>
      </main>
    </div>
    <button
      class="fixed bottom-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded border-2 border-black bg-white text-xl text-black lg:hidden"
      @click="showMenu = !showMenu"
    >
      O
    </button>
  </div>
</template>
