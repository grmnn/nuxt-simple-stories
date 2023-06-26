<script setup lang="ts">
import {
	computed,
	definePageMeta,
	onMounted,
	onUnmounted,
	ref,
	shallowRef,
	useRoute,
	useRouter,
	useStories,
} from '#imports'

definePageMeta({
	layout: 'story-layout',
})

const { storiesTree, stories } = await useStories()
const selectedStory = shallowRef<IStory | null>(null)
const router = useRouter()
const route = useRoute()

const storyEl = ref<HTMLDivElement>()
const minWidth = ref(280)

const computedComponent = computed(() => {
	return selectedStory.value?.component
})

function setSelectedStory(story: IStory) {
	selectedStory.value = story
	if (story.isVariant) {
		router.push(`?component=${story.parent.name}&variant=${story.name}`)
	}

	router.push(`?component=${story.name}`)
}

function setSelectedVariant(story: IStory) {
	selectedStory.value = story
	router.push(`?component=${story.name}&variant=${story.variantName}`)
}

const openTree = ref(true)

onMounted(() => {
	document.documentElement.classList.add('nxs')
	const story = stories.find(story => story.name === route.query.component)

	if (route.query.component && route.query.variant) {
		const variant = story?.variants?.find(variant => variant.name === route.query.variant)
		if (variant) {
			setSelectedVariant(variant)
			return
		}
	}

	if (story) {
		setSelectedStory(story)
		return
	}

	setSelectedStory(stories[0])
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
          @selectStory="setSelectedStory"
          @selectVariant="setSelectedVariant"
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
          v-if="computedComponent"
          class="nxs:space-y-4 lg:nxs-space-y-16"
        >
          <Component :is="computedComponent" />
        </div>
      </Transition>
    </main>
  </div>
</template>
