<script setup lang="ts">
interface IJModalProps {
	modelValue: boolean
	fullHeight?: boolean
	title?: string
}

const props = withDefaults(defineProps<IJModalProps>(), {
	fullHeight: false,
})

const emits = defineEmits(['update:modelValue'])

const computedModalClass = computed(() => {
	const defaults = {
		'rounded-lg': !props.fullHeight,
	}

	const sizing = {
		'inset-0 ': props.fullHeight,
		'lg:top-12 lg:bottom-12 lg:left-1/2 lg:-translate-x-1/2': props.fullHeight,
		'bottom-4 left-4 right-4': !props.fullHeight,
		'lg:bottom-auto lg:right-auto lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2': !props.fullHeight,
	}

	return {
		...defaults,
		...sizing,
	}
})

const slots = useSlots()

function closeModal() {
	emits('update:modelValue', false)
}
</script>

<template>
  <Teleport to="body">
    <Transition
      appear
      name="fade"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 bg-grayA12"
        @click="closeModal"
      />
    </Transition>
    <Transition
      appear
      name="fade"
    >
      <div
        v-if="modelValue"
        :class="computedModalClass"
        class="fixed z-50 flex flex-col border border-gray7 bg-gray3 text-white shadow lg:w-full lg:max-w-2xl lg:rounded-lg"
      >
        <header
          v-if="title"
          class="flex w-full items-center justify-between p-4"
          :class="title ? 'border-b border-b-gray7  space-x-4 ' : ''"
        >
          <h1
            v-if="title"
            class="font-semibold lg:text-lg"
          >
            {{ title }}
          </h1>
        </header>
        <main
          class="p-4"
          :class="{
            'flex-1 overflow-y-auto': fullHeight,
          }"
        >
          <slot />
        </main>
        <footer
          v-if="slots.footer"
          class="flex flex-col space-y-4 border-t border-gray7 px-6 py-4 lg:flex-row lg:justify-end lg:space-x-4 lg:space-y-0"
        >
          <slot name="footer" />
        </footer>
      </div>
    </Transition>
  </Teleport>
</template>
