<script setup lang="ts">
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import 'dayjs/locale/de'
import JDatepickerDay from './JDatepickerDay.vue'

dayjs.extend(weekday)

export interface IDay {
	date: Dayjs
	dateOfMonth: number
	isDisabled: boolean
	type: 'past' | 'future' | 'current'
}

const props = defineProps<{
	modelValue: dayjs.Dayjs
	disableFutureDates?: boolean
}>()

const emits = defineEmits(['update:modelValue'])

const monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const date = ref(dayjs(props.modelValue))
const initialDate = ref(dayjs(props.modelValue))

const month = computed(() => date.value.month())
const year = computed(() => date.value.year())

function setDate(day: IDay) {
	if (day.type === 'future' && props.disableFutureDates)
		return

	initialDate.value = day.date
	emits('update:modelValue', day.date)
}

function previousMonth() {
	date.value = date.value.subtract(1, 'month')
}

function nextMonth() {
	date.value = date.value.add(1, 'month')
}

function resetDate() {
	date.value = dayjs()
}

const days = computed(() => {
	const firstDayOfMonthIndex = date.value.startOf('month').weekday() - 1
	const lastDayOfPreviousMonth = date.value.subtract(1, 'month').daysInMonth()

	const out: IDay[] = []

	for (let i = 0; i < 42; i++) {
		if (i < firstDayOfMonthIndex) {
			const dateOfMonth = lastDayOfPreviousMonth - firstDayOfMonthIndex + i + 1
			const pastDate = date.value.subtract(1, 'month').date(dateOfMonth)
			out.push({
				date: pastDate,
				dateOfMonth, // index
				isDisabled: false,
				type: 'past',
			})

			continue
		}

		if (i >= firstDayOfMonthIndex + date.value.daysInMonth()) {
			const dateOfMonth = i - firstDayOfMonthIndex - date.value.daysInMonth() + 1
			const futureDate = date.value.add(1, 'month').date(dateOfMonth)
			out.push({
				date: futureDate,
				dateOfMonth,
				isDisabled: props.disableFutureDates,
				type: 'future',
			})
			continue
		}

		const dateOfMonth = i - firstDayOfMonthIndex + 1
		const currentDate = date.value.date(dateOfMonth)
		out.push({
			date: currentDate,
			dateOfMonth,
			isDisabled: false,
			type: 'current',
		})
	}

	return out
})
</script>

<template>
  <div class="rounded-lg p-4">
    <div class="mx-auto min-w-[300px] max-w-[420px]">
      <div class="mb-4 flex items-center justify-between">
        <h1 class="font-medium tracking-wide">
          {{ monthLabels[month] }} - {{ year }}
        </h1>
        <div class="flex items-center space-x-3">
          <JButton
            icon="chevron-left"
            small
            variant="secondary"
            @click="previousMonth"
          />
          <JButton
            icon="today"
            small
            variant="secondary"
            @click="resetDate"
          />
          <JButton
            icon="chevron-right"
            small
            variant="secondary"
            @click="nextMonth"
          />
        </div>
      </div>
      <div class="border-prm grid grid-cols-7 border-b border-grayA1 pb-2">
        <div
          v-for="dayLabel in dayLabels"
          :key="dayLabel"
          class="text-neutral text-center text-sm font-medium"
        >
          {{ dayLabel.slice(0, 2) }}
        </div>
      </div>
      <div class="grid grid-cols-7">
        <JDatepickerDay
          v-for="day in days"
          :key="`${day.dateOfMonth} + -${day.type}`"
          :day-object="day"
          :current-date="initialDate"
          @click="setDate(day)"
        />
      </div>
    </div>
  </div>
</template>
