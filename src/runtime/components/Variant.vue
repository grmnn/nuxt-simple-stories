<script setup lang="ts">
import { computed, useRoute } from '#imports'

interface IVariant {
	title?: string
}
const props = defineProps<IVariant>()

const route = useRoute()

const computedShow = computed(() => {
	if (!route.query.variant)
		return true

	return route.query.variant === props.title
})
</script>

<template>
  <div v-if="computedShow">
    <h2 class="nxs-mb-4 nxs-text-2xl ">
      {{ title }} {{ computedShow }}
    </h2>
    <div
      class="nxs-flex nxs-w-full nxs-flex-wrap nxs-gap-20 nxs-rounded nxs-border nxs-border-neutral-600 nxs-p-8"
    >
      <slot />
    </div>
  </div>
</template>
