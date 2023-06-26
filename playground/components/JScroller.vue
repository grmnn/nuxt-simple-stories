<script setup lang="ts">
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'

import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.extend(isToday)
dayjs.extend(advancedFormat)

interface IItem {
	id: string
	user_id: string
	subject: string
	content: unknown
}

interface DynamicScrollerItemProps {
	item: IItem
	index: number
	active: boolean
}

// TODO: figure out how to type this properly
interface ScrollerElement extends HTMLElement {
	scrollToItem: (id: number) => void
}

interface IJScrollerProps {
	modelValue?: dayjs.Dayjs
}

const props = defineProps<IJScrollerProps>()

const windowHeight = (window.innerHeight / 100) * 60
const scrollDirection = ref<'up' | 'down'>('down')
const scrollerEl = ref<ScrollerElement>()

const authStore = useAuth()

interface IStore {
	todayId: number
	dailyNotes: Record<string, IItem>
}
const store = ref<IStore>({
	todayId: 0,
	dailyNotes: {},
})
const dailyNoteItems = ref<IItem[]>([])

const { directions, arrivedState } = useScroll(scrollerEl, {
	offset: { // TODO: make some calculations to get a better offset value
		top: 300,
		bottom: 300,
	},
	onScroll() {
		if (directions.bottom && scrollDirection.value === 'up') {
			scrollDirection.value = 'down'
		} else if (directions.top && scrollDirection.value === 'down') {
			scrollDirection.value = 'up'
		}
	},
})

function loadCurrentDates(d = dayjs()) {
	const initialPastDate = d.subtract(10, 'day')
	const initialLoadedDays = 20

	const currentItems = []

	for (let i = 0; i < initialLoadedDays; i++) {
		const currentDate = initialPastDate.add(i, 'day')
		const isToday = currentDate.isToday()
		if (isToday) {
			store.value.todayId = i
		}

		const note = store.value.dailyNotes[currentDate.format('YYYY-MM-DD')]
		if (note) {
			currentItems.push(note)
		} else {
			currentItems.push({
				id: currentDate.format('YYYY-MM-DD'),
				user_id: authStore.userId!,
				subject: dayjs(currentDate).format('ddd, Do MMMM, YYYY'),
				content: null,
			})
		}
	}
	dailyNoteItems.value = currentItems
	if (scrollerEl.value) {
		scrollerEl.value.scrollToItem(10)
	}
}

loadCurrentDates()

function loadPastDates() {
	const firstDate = dailyNoteItems.value[0].id
	const firstDateDayjs = dayjs(firstDate)

	for (let i = 1; i <= 10; i++) {
		const currentDate = firstDateDayjs.subtract(i, 'day')
		const note = store.value.dailyNotes[currentDate.format('YYYY-MM-DD')]

		if (note) {
			dailyNoteItems.value.unshift(note)
		} else {
			dailyNoteItems.value.unshift({
				id: currentDate.format('YYYY-MM-DD'),
				user_id: authStore.userId!,
				subject: dayjs(currentDate).format('ddd, Do MMMM, YYYY'),
				content: null,
			})
		}
	}

	if (scrollerEl.value) {
		scrollerEl.value.scrollToItem(10)
	}
}

function loadFutureDates() {
	const lastDate = dailyNoteItems.value[dailyNoteItems.value.length - 1].id
	const lastDateDayjs = dayjs(lastDate)

	for (let i = 1; i <= 10; i++) {
		const currentDate = lastDateDayjs.add(i, 'day')
		const note = store.value.dailyNotes[currentDate.format('YYYY-MM-DD')]

		if (note) {
			dailyNoteItems.value.push(note)
		} else {
			dailyNoteItems.value.push({
				id: currentDate.format('YYYY-MM-DD'),
				user_id: authStore.userId!,
				subject: dayjs(currentDate).format('ddd, Do MMMM, YYYY'),
				content: null,
			})
		}
	}
}

watch(
	() => arrivedState.top,
	(val) => {
		if (val) {
			loadPastDates()
		}
	},
)

watch(
	() => arrivedState.bottom,
	(val) => {
		if (val) {
			loadFutureDates()
		}
	},
)

watch(
	() => props.modelValue,
	(val) => {
		if (dayjs.isDayjs(val)) {
			loadCurrentDates(val)
		}
	})

function onVisible() {
	if (!scrollerEl.value || !store.value.todayId)
		return

	scrollerEl.value.scrollToItem(store.value.todayId)
}
</script>

<template>
  <DynamicScroller
    ref="scrollerEl"
    :items="dailyNoteItems"
    :min-item-size="windowHeight"
    class="w-full"
    list-class="px-8 divide-y divide-gray8"
    @visible="onVisible"
  >
    <template #default="{ item, index, active }: DynamicScrollerItemProps">
      <DynamicScrollerItem
        class="flex h-full min-h-[60vh] px-4 py-12"
        :item="item"
        :active="active"
        :size-dependencies="[
          item.content,
        ]"
        :data-index="index"
      >
        <div class="flex flex-col">
          <h1 class="text-2xl">
            {{ item.subject }}
          </h1>
          <pre>
					{{ item }}
				</pre>
        </div>
      </DynamicScrollerItem>
    </template>
  </DynamicScroller>
</template>
