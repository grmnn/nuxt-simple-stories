<script setup lang="ts">
const icons = useNxsIcons()

const { size = '20' } = defineProps<{
	name: keyof typeof icons
	size?: string
}
>()
</script>

<template>
  <Icon
    :name="icons[name]"
    :size="size"
  />
</template>
