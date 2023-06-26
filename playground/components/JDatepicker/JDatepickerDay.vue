<script setup lang="ts">
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

export interface IDay {
	date: Dayjs
	dateOfMonth: number
	isDisabled: boolean
	type: 'past' | 'future' | 'current'
}

const props = defineProps<{
	dayObject: IDay
	currentDate: dayjs.Dayjs
}>()

const isSelected = computed(() => props.dayObject.date.isSame(props.currentDate, 'day'))
const isToday = computed(() => props.dayObject.date.isSame(dayjs(), 'day'))
</script>

<template>
  <div
    class="m-[6px] flex aspect-square select-none items-center justify-center rounded-full"
    :class="{
      'text-gray9': props.dayObject.type === 'past' || props.dayObject.type === 'future',
      'bg-white text-gray1': isSelected,
      'border-2 border-white': isToday,
      'cursor-default text-gray9': props.dayObject.isDisabled,
      'cursor-pointer': !props.dayObject.isDisabled,
      'hover:bg-gray4': !isSelected && !isToday && !props.dayObject.isDisabled,
    }"
  >
    {{ dayObject.dateOfMonth }}
  </div>
</template>
