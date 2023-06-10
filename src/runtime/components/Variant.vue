<script setup lang="ts">
interface IVariant {
	title?: string
}

defineProps<IVariant>()
</script>

<template>
  <div class="">
    <h2 class="nxs-mb-4 nxs-text-2xl ">
      {{ title }}
    </h2>
    <div
      class="nxs-flex nxs-w-full nxs-flex-wrap nxs-gap-20 nxs-rounded nxs-border nxs-border-neutral-600 nxs-p-8"
    >
      <slot />
    </div>
  </div>
</template>
