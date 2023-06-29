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
  <div
    v-if="computedShow"
    class="nxs-rounded nxs-border nxs-border-neutral-600 "
  >
    <header class="nxs-border-b nxs-border-b-neutral-600 nxs-p-4">
      <h2 class="nxs-text-2xl ">
        {{ title }}
      </h2>
    </header>
    <div
      class="nxs-flex nxs-w-full nxs-flex-wrap nxs-gap-20 nxs-p-8"
    >
      <slot />
    </div>
  </div>
</template>
