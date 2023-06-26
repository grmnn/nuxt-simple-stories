<script setup lang="ts">
const { isMobile, isDesktop } = useScreen()

enum SwipeDirection {
	UP = 'up',
	DOWN = 'down',
	LEFT = 'left',
	RIGHT = 'right',
}

interface iDropdownItem {
	label: string
	icon: string
	onClick: () => void
}

interface iDropdownProps {
	items: iDropdownItem[] | iDropdownItem[][]
}

defineProps<iDropdownProps>()

const open = ref(false)
const target = ref<HTMLElement | null>(null)
const windowHeight = computed(() => window.innerHeight)
const targetHeight = computed(() => target.value?.clientHeight)
const inialTargetHeight = ref(0)

const topValue = 'auto'
const top = ref(topValue)

const currentState = ref<'full' | 'auto' | 'close'>('auto')
watch(
	() => target.value,
	(newVal) => {
		if (newVal) {
			newVal.addEventListener('transitionend', () => {
				if (currentState.value === 'close') {
					open.value = false
				}
			})
		}
	},
)

watch(
	() => target.value?.clientHeight,
	(newVal) => {
		if (typeof newVal === 'number' && newVal > 0 && !inialTargetHeight.value) {
			inialTargetHeight.value = newVal
		}
	},
)

const { direction, isSwiping, lengthY } = useSwipe(target, {
	passive: false,
	threshold: 10,
	onSwipe() {
		if (windowHeight.value && targetHeight.value) {
			const swipedLength = Math.abs(lengthY.value)
			switch (direction.value) {
				case SwipeDirection.UP:
					if (top.value !== '0') {
						top.value = `${(swipedLength - (windowHeight.value - targetHeight.value)) * -1}px`
					}
					break
				case SwipeDirection.DOWN:
					if (currentState.value === 'full') {
						top.value = `${swipedLength}px`
					}

					if (currentState.value === 'auto') {
						const offset = windowHeight.value - targetHeight.value
						top.value = `${swipedLength + offset}px`
					}
					break
			}
		}
	},
	onSwipeEnd(_e: TouchEvent, direction) {
		switch (direction) {
			case SwipeDirection.UP:
				top.value = '0'
				currentState.value = 'full'
				break
			case SwipeDirection.DOWN:
				if (currentState.value === 'full') {
					top.value = `${windowHeight.value - inialTargetHeight.value}px`
					currentState.value = 'auto'
				} else if (currentState.value === 'auto') {
					top.value = `${windowHeight.value}px`
					currentState.value = 'close'
				}
				break
		}
	},
})

function onOpen() {
	top.value = 'auto'
	currentState.value = 'auto'
	open.value = true
}

function onClose() {
	top.value = 'auto'
	currentState.value = 'auto'
	open.value = false
}
</script>

<template>
  <button @click="onOpen">
    Open
  </button>
  <Teleport
    :disabled="isDesktop"
    to="body"
  >
    <Transition
      name="fade"
      appear
    >
      <div
        v-if="open && isMobile"
        class="bg-black/10 fixed inset-0 z-50 backdrop-blur-[2px]"
        @click="onClose"
      />
    </Transition>
    <Transition
      name="fade"
      appear
    >
      <div
        v-if="open"
        ref="target"
        static
        class="overlay absolute inset-0 z-50 rounded-t-xl border-t border-transparent bg-gray2 px-4 pb-4 lg:inset-auto lg:p-1"
        :class="{ animated: !isSwiping }"
        :style="{ top }"
      >
        <div class="mx-auto mb-6 mt-2 h-1.5 w-12 rounded-full bg-gray10 lg:hidden" />

        <div class="max-h-[400px] overflow-scroll">
          <ul class="divide-neutral-500 mb-4 flex flex-col divide-y rounded-lg bg-gray10">
            <li class="w-full px-4 py-3">
              Add to Favorites
            </li>
          </ul>
          <ul class="divide-neutral-500 mb-4 flex flex-col divide-y rounded-lg bg-gray10">
            <li class="w-full px-4 py-3">
              Add to Favorites
            </li>
          </ul>
          <ul class="divide-neutral-500 mb-4 flex flex-col divide-y rounded-lg bg-gray10">
            <li class="w-full px-4 py-3">
              Add to Favorites
            </li>
          </ul>
          <ul class="divide-neutral-500 flex flex-col divide-y rounded-lg bg-gray10">
            <li class="w-full px-4 py-3">
              Add to Favorites
            </li>
            <li class="w-full px-4 py-3">
              Duplicate
            </li>
            <li class="w-full px-4 py-3">
              Move to
            </li>
            <li class="w-full px-4 py-3">
              Delete
            </li>
          </ul>
          <ul class="divide-neutral-500 flex flex-col divide-y rounded-lg bg-gray10">
            <li class="w-full px-4 py-3">
              Add to Favorites
            </li>
            <li class="w-full px-4 py-3">
              Duplicate
            </li>
            <li class="w-full px-4 py-3">
              Move to
            </li>
            <li class="w-full px-4 py-3">
              Delete
            </li>
          </ul>
          <ul class="divide-neutral-500 flex flex-col divide-y rounded-lg bg-gray10">
            <li class="w-full px-4 py-3">
              Add to Favorites
            </li>
            <li class="w-full px-4 py-3">
              Duplicate
            </li>
            <li class="w-full px-4 py-3">
              Move to
            </li>
            <li class="w-full px-4 py-3">
              Delete
            </li>
          </ul>
          <ul class="divide-neutral-500 flex flex-col divide-y rounded-lg bg-gray10">
            <li class="w-full px-4 py-3">
              Add to Favorites
            </li>
            <li class="w-full px-4 py-3">
              Duplicate
            </li>
            <li class="w-full px-4 py-3">
              Move to
            </li>
            <li class="w-full px-4 py-3">
              Delete
            </li>
          </ul>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.overlay.animated {
  transition: all 0.2s ease-out;
}
</style>
