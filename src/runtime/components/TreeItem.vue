<script setup lang="ts">
import type { IStory } from '@/types'

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
const folderIsOpen = ref(true)
const variantsIsOpen = ref(true)

const isFolder = computed(() => {
	return props.item.children?.length > 0
})

const hasVariants = computed(() => {
	return props.item.variants?.length > 0
})
const treeSpacing = ['nxs-pl-0', 'nxs-pl-2', 'nxs-pl-4', 'nxs-pl-6', 'nxs-pl-8', 'nxs-pl-10']
const computedTreeSpacing = computed(() => {
	const spacing = treeSpacing[props.level]

	return {
		[spacing]: true,
	}
})

function activeClass(variant: IStory) {
	const isActive = route.query?.component === props.item.name && route.query?.variant === variant.variantName

	return {
		'nxs-text-white font-bold': isActive,
		'nxs-text-neutral-500': !isActive,
	}
}

const computedVariantItemClass = computed(() => {
	const spacing = treeSpacing[props.level + 1]

	return {
		[spacing]: true,
	}
})

function onTreeItemClick() {
	if (isFolder.value) {
		folderIsOpen.value = !folderIsOpen.value
		return
	}

	variantsIsOpen.value = !variantsIsOpen.value
	emits('selectStory', props.item)
}

function onSelectVariant(variant: IStory) {
	if (route.query?.variant === variant.variantName) {
		emits('selectStory', props.item)
		return
	}
	emits('selectVariant', variant)
}

function scrollToVariant(variant: IStory) {
	emits('selectStory', props.item)
}

const computedComponentName = computed(() => {
	return route.query?.component as string
})
</script>

<template>
  <li>
    <div
      v-if="item.name"
      :class="{
        'nxs-bg-neutral-800': props.activeFile === props.item.name,
        ...computedTreeSpacing,
      }"
      class="nxs-flex nxs-cursor-pointer nxs-select-none nxs-items-center nxs-py-1.5 nxs-pr-4 hover:nxs-bg-neutral-600"
      @click="onTreeItemClick"
    >
      <NxsIcons
        v-if="isFolder && folderIsOpen"
        name="folder-open"
        size="24"
      />
      <NxsIcons
        v-else-if="isFolder && !folderIsOpen"
        name="folder-closed"
        size="24"
      />

      <NxsIcons
        v-else
        name="story"
      />
      <span class="nxs-ml-2"> {{ item.name }}</span>
      <button
        v-if="!isFolder && hasVariants"
        class="nxs-ml-auto nxs-text-neutral-300"
      >
        <NxsIcons
          name="chevron-toggle"
          size="16"
        />
      </button>
    </div>
    <ul
      v-if="item.variants && item.variants.length && variantsIsOpen"
    >
      <li
        v-for="variant of item.variants"
        :key="variant.variantName"
        class="nxs-flex nxs-items-center nxs-relative nxs-py-1.5 hover:nxs-text-white nxs-cursor-pointer nxs-select-none nxs-group nxs-pr-4"
        :class="[computedVariantItemClass, activeClass(variant)]"
        @click="scrollToVariant(variant)"
      >
        <NxsIcons
          name="variant"
        />
        <span class="nxs-ml-2 nxs-text-sm"> {{ variant.variantName }}</span>
        <button
          class="nxs-absolute nxs-right-4 group-hover:nxs-visible nxs-invisible"
          @click.stop="onSelectVariant(variant)"
        >
          <NxsIcons
            :name="variant.variantName === route.query?.variant ? 'eye-closed' : 'eye-open'"
          />
        </button>
      </li>
    </ul>
    <ul
      v-show="folderIsOpen"
      v-if="isFolder"
    >
      <TreeItem
        v-for="(child, index) in item.children"
        :key="index"
        :level="level + 1"
        :class="`${level + 1}`"
        :item="child"
        :active-file="computedComponentName"
        @select-story="emits('selectStory', $event)"
        @select-variant="emits('selectVariant', $event)"
      />
    </ul>
  </li>
</template>
