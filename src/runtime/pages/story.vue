<script setup lang="ts">
import type { IStory, ITreeItem } from '../../types'
import { computed, defineAsyncComponent, definePageMeta, onMounted, onUnmounted, ref, useRoute, useRouter } from '#imports'

definePageMeta({
	layout: 'story-layout',
})

const storyModules = await import.meta.glob('/stories/**/*.story.vue') as Record<string, () => Promise<{ default: any }>>

const storiesTree = ref<ITreeItem | {}>({})
const stories = ref<IStory[]>([])
const selectedStory = ref<IStory>()
const router = useRouter()
const route = useRoute()

const storyEl = ref<HTMLDivElement>()
const minWidth = ref(280)

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
		path: storyPath,
	})
}

const computedStoryComponent = computed(() => {
	if (!selectedStory.value?.path) {
		return
	}
	const storyComponent = defineAsyncComponent(storyModules[selectedStory.value.path])

	return storyComponent
})

async function setComponent(story: IStory) {
	selectedStory.value = story
	router.push(`?component=${story.name}`)
}

const openTree = ref(true)

onMounted(() => {
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

function onMousedown() {
	document.addEventListener('mousemove', resize, false)
	document.addEventListener('mouseup', () => {
		document.removeEventListener('mousemove', resize, false)
	}, false)
}

function resize(e: MouseEvent) {
	if (!storyEl.value)
		return

	const sidebarWidth = e.clientX

	if (sidebarWidth < minWidth.value)
		return

	storyEl.value.style.gridTemplateColumns = `${sidebarWidth}px 1px auto`
}
</script>

<template>
  <div
    ref="storyEl"
    class="nxs-absolute nxs-inset-0 nxs-grid nxs-grid-rows-[1fr] nxs-overflow-hidden"
    :style="{
      gridTemplateColumns: `${minWidth}px 1px auto`,
    }"
  >
    <aside
      class="nxs-h-full nxs-border-r nxs-border-neutral-600 nxs-bg-black nxs-pt-12 nxs-transition lg:nxs-relative lg:nxs-inset-y-auto lg:nxs-left-auto nxs-flex nxs-flex-col"
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
    <div
      class="group nxs-relative nxs-inset-y-0 nxs-left-[-8px] nxs-z-20 nxs-w-4 nxs-cursor-col-resize"
      @mousedown="onMousedown"
    >
      <div class="mx-auto nxs-h-full nxs-w-[1px] nxs-transition nxs-duration-500 nxs-ease-out group-hover:nxs-bg-primary" />
    </div>
    <main class="nxs-relative nxs-flex nxs-h-full nxs-flex-col nxs-overflow-y-auto nxs-px-4 nxs-pt-8 lg:nxs-px-12 lg:nxs-pt-12">
      <Transition
        mode="out-in"
        name="fade"
      >
        <div
          v-if="computedStoryComponent"
          class="nxs:space-y-4 lg:nxs-space-y-16"
        >
          <Component :is="computedStoryComponent" />
        </div>
      </Transition>
    </main>
  </div>
</template>
