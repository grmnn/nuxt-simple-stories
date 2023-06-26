<script setup lang="ts">
const Icons = useIcons()
interface IButtonProps {
	type?: 'submit' | 'button' | 'reset'
	variant?: 'primary' | 'secondary' | 'tertiary' | 'error'
	small?: boolean
	href?: string
	to?: string
	icon?: keyof typeof Icons
	iconRight?: keyof typeof Icons
}

const props = withDefaults(defineProps<IButtonProps>(), {
	variant: 'primary',
})

const computedButtonIconSize = computed(() => props.small ? '20' : '24')

const computedButtonType = computed(() => props.to ? undefined : props.type)
const slots = useSlots()
const iconOnly = computed(() => props.icon && !slots.default)

const component = computed(() => {
	if (props.to) {
		return resolveComponent('NuxtLink')
	}

	return 'button'
})

const computedButtonClasses = computed(() => {
	return {
		'btn-primary': props.variant === 'primary',
		'btn-secondary': props.variant === 'secondary',
		'btn-tertiary': props.variant === 'tertiary',
		'btn-error': props.variant === 'error',

		'btn-small': props.small,
		'btn-icon': iconOnly.value,
		'btn-icon-small': iconOnly.value && props.small,
	}
})
</script>

<template>
  <component
    :is="component"
    :to="to"
    :type="computedButtonType"
    class="btn"
    :class="computedButtonClasses"
  >
    <JIcon
      v-if="icon"
      :name="icon"
      :size="computedButtonIconSize"
    />

    <span
      v-if="!iconOnly"
      :class="{
        'z-10': props.variant === 'secondary',
        'mx-2': props.icon && props.iconRight,
        'mr-2': !props.icon && props.iconRight,
        'ml-2': props.icon && !props.iconRight,
      }"
    >
      <slot />
    </span>
    <JIcon
      v-if="iconRight"
      :name="iconRight"
      :size="computedButtonIconSize"
    />
  </component>
</template>

<style scoped>
.btn {
  @apply inline-flex
  h-[42px]
  w-auto
  flex-none
  touch-none
  select-none
  items-center
  justify-center
  rounded-md
  border
  border-transparent
  px-4
  text-[16px]
  font-medium
  leading-none
  focus-visible:outline-none
  focus-visible:ring-2
  disabled:cursor-not-allowed
  disabled:opacity-50
	focus-visible:ring-primary;
}

.btn-primary {
  @apply bg-whiter
  text-gray1
  hover:bg-white
  disabled:hover:bg-white;
}

.btn-secondary {
  @apply relative
  transform-gpu
  border-none

  bg-gray5
  text-white
  shadow-button
  before:absolute
  before:-inset-[1.5px]
  before:block
  before:rounded-lg
  before:border-[1px]
  before:border-grayA1
  after:absolute
  after:-inset-[1px]
  after:block

  after:rounded-md
  after:bg-gradient-to-t
  after:from-gray1/[0.3]
  after:opacity-50
  after:transition-opacity
  hover:after:opacity-100;
}

.btn-error {
  @apply bg-error
  text-white
  hover:bg-error/90
}

.btn-small {
  @apply h-8
  text-sm
  px-3.5
}

.btn-icon {
  @apply w-10
  h-10
  p-0
}

.btn-icon-small {
  @apply w-8
  h-8
  p-0
}
</style>
