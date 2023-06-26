<script setup lang="ts">
import dayjs from 'dayjs'

const dailyNotesEl = ref<HTMLElement>()
const minWidth = 340 + 32

function onMousedown() {
	document.addEventListener('mousemove', resize, false)
	document.addEventListener('mouseup', () => {
		document.removeEventListener('mousemove', resize, false)
	}, false)
}

function resize(e: MouseEvent) {
	if (!dailyNotesEl.value)
		return

	const windowWidth = window.innerWidth
	const sidebarWidth = windowWidth - e.clientX

	if (sidebarWidth < minWidth)
		return

	dailyNotesEl.value.style.gridTemplateColumns = `auto 1px ${sidebarWidth}px`
}

const date = ref(dayjs())
</script>

<template>
  <Variant>
    <article
      ref="dailyNotesEl"
      class="absolute inset-0 grid grid-rows-[1fr] overflow-hidden"
      :style="{
        gridTemplateColumns: `auto 1px ${minWidth}px`,
      }"
    >
      <JScroller v-model="date" />

      <div
        class="group relative inset-y-0 left-[-8px] z-20 w-4 cursor-col-resize"
        @mousedown="onMousedown"
      >
        <div class="mx-auto h-full w-[1px] bg-grayA1 transition duration-500 ease-out group-hover:bg-primary" />
      </div>
      <aside class="select-none bg-gray3 px-4 pt-4">
        <JDatepicker v-model="date" />
      </aside>
    </article>
  </Variant>
</template>
