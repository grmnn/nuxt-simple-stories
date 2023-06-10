<script setup lang="ts">
defineProps<{
	variant: 'primary' | 'secondary'
}>()
</script>

<template>
  <button
    :class="{
      'nxs-bg-blue-500 hover:nxs-bg-blue-700 nxs-text-white nxs-font-bold nxs-py-2 nxs-px-4 nxs-rounded': variant === 'primary',
      'nxs-bg-gray-500 hover:nxs-bg-gray-700 nxs-text-white nxs-font-bold nxs-py-2 nxs-px-4 nxs-rounded': variant === 'secondary',
    }"
  >
    <slot />
  </button>
</template>

<style scoped>
</style>
