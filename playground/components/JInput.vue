<script setup lang="ts">
const icons = useIcons()
interface IInputProps {
	label?: string
	modelValue?: string | number
	placeholder?: string
	type?: string
	disabled?: boolean
	errorMessage?: string
	readonly?: boolean
	small?: boolean
	prefix?: keyof typeof icons
	suffix?: keyof typeof icons
}

const props = withDefaults(defineProps<IInputProps>(), {
	type: 'text',
	small: false,
	readonly: false,
})

const emits = defineEmits(['update:modelValue', 'change'])

function onInput(e: Event) {
	const target = e.target as HTMLInputElement
	emits('update:modelValue', target.value)
	emits('change')
}

const computedInputClass = computed(() => {
	const sizing = {
		'h-[32px] leading-[32px] text-sm px-2': props.small,
		'h-[48px] leading-[48px] text-base px-3': !props.small,
	}

	const spacing = {
		'pl-9': props.prefix,
		'pr-9': props.suffix,
	}

	return {
		...spacing,
		...sizing,
	}
})

const computedIconClass = computed(() => {
	return {
		'absolute top-1/2 -translate-y-1/2 z-10 text-gray-3': true,
	}
})
</script>

<template>
  <label class="block">
    <span
      v-if="label"
      class="mb-2 inline-block text-xs uppercase tracking-wide text-gray-3"
    >
      {{ label }}
    </span>
    <div
      class="relative flex"
    >

      <JIcon
        v-if="prefix"
        class="left-2"
        :class="computedIconClass"
        :name="prefix"
        size="20"
      />

      <input
        class="relative
        h-8 w-full appearance-none rounded-md border
        border-gray-2
        bg-gray-1
        text-white
        outline-2
        outline-offset-2
        outline-transparent
        placeholder:text-gray-2
        focus:ring-2
        focus:ring-primary/80
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
        :class="computedInputClass"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="disabled"
        :readonly="readonly"
        @input="onInput"
      >

      <JIcon
        v-if="suffix"
        class="right-2"
        :class="computedIconClass"
        :name="suffix"
        size="20"
      />

    </div>
    <p
      v-if="errorMessage"
      class="mt-2 flex items-center space-x-2 text-xs text-error"
    >
      <JIcon
        name="error"
        size="18"
      />
      <span> {{ errorMessage }}</span>
    </p>
  </label>
</template>
