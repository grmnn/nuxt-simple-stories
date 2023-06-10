<script setup lang="ts">
import type { IStory } from '../types'

import { computed, ref, useRoute } from '#imports'

const props = defineProps<{
	item: any
	level: number
	activeFile: string
}>()

const emits = defineEmits<{
	(e: 'selectFile', item: any): void
}>()
const route = useRoute()
const isOpen = ref(true)

const isFolder = computed(() => {
	return props.item.children?.length > 0
})

const computedSpacingStep = computed(() => {
	const spacing = ['nxs-pl-0', 'nxs-pl-4', 'nxs-pl-10', 'nxs-pl-16'][props.level]

	return {
		[spacing]: true,
		'nxs-bg-neutral-800': props.activeFile === props.item.name,
	}
})

function toggle() {
	if (isFolder.value) {
		isOpen.value = !isOpen.value
	} else {
		emits('selectFile', props.item)
	}
}

function onSelectStory(story: IStory) {
	emits('selectFile', story)
}
</script>

<template>
  <li>
    <div
      v-if="item.name"
      :class="computedSpacingStep"
      class="nxs-flex nxs-cursor-pointer nxs-select-none nxs-items-center nxs-gap-1 nxs-py-1.5 hover:nxs-bg-neutral-600"
      @click="toggle"
    >
      <TreeItemIcon
        :is-folder="isFolder"
        :is-open="isOpen"
      />
      <span class="nxs-ml-1"> {{ item.name }}</span>
    </div>
    <ul
      v-show="isOpen"
      v-if="isFolder"
    >
      <TreeItem
        v-for="(child, index) in item.children"
        :key="index"
        :level="level + 1"
        :class="`${level + 1}`"
        :item="child"
        :active-file="route.query.component as string"
        @select-file="onSelectStory"
      />
    </ul>
  </li>
</template>
