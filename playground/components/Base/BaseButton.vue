<script setup lang="ts">
defineProps<{
	variant: 'primary' | 'secondary'
}>()
</script>

<template>
  <button
    :class="{
      'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded': variant === 'primary',
      'bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded': variant === 'secondary',
    }"
  >
    <slot />
  </button>
</template>

<style scoped>
</style>
