<script setup lang="ts">
import type { IStory } from '../types'

import { computed, ref, useRoute } from '#imports'

const props = defineProps<{
	item: any
	level: number
	activeFile: string
}>()

const emits = defineEmits<{
	(event: 'selectStory', story: IStory): void
	(event: 'selectVariant', variant: IStory): void
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
	}
})

function onTreeItemClick() {
	if (isFolder.value) {
		isOpen.value = !isOpen.value
		return
	}

	console.log(props.item)
	emits('selectStory', props.item)
}

function onSelectVariant(variant: IStory) {
	console.log(variant)
	emits('selectVariant', variant)
}
</script>

<template>
  <li>
    <div
      v-if="item.name"
      :class="{
        'nxs-bg-neutral-800': props.activeFile === props.item.name,
        ...computedSpacingStep,
      }"
      class="nxs-flex nxs-cursor-pointer nxs-select-none nxs-items-center nxs-gap-1 nxs-py-1.5 hover:nxs-bg-neutral-600"
      @click="onTreeItemClick"
    >
      <TreeItemIcon
        :is-folder="isFolder"
        :is-open="isOpen"
      />
      <span class="nxs-ml-1"> {{ item.name }}</span>
    </div>
    <ul
      v-if="item.variants && item.variants.length"
      :class="computedSpacingStep"
    >
      <li
        v-for="variant of item.variants"
        :key="variant.variantName"
        class="nxs-flex nxs-items-center"
        @click="onSelectVariant(variant)"
      >
        <VueIcon /> <span class="nxs-ml-1"> {{ variant.variantName }}</span>
      </li>
    </ul>
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
        :active-file="route.query.component"
        @select-story="emits('selectStory', $event)"
        @select-variant="emits('selectVariant', $event)"
      />
    </ul>
  </li>
</template>
