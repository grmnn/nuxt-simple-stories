<script setup lang="ts">
interface IVariant {
	title?: string
}

defineProps<IVariant>()
</script>

<template>
  <div class="">
    <h2 class="mb-4 text-2xl ">
      {{ title }}
    </h2>
    <div
      class="flex w-full flex-wrap gap-20 rounded border border-gray-2 p-8"
    >
      <slot />
    </div>
  </div>
</template>
