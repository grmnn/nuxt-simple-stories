<script setup lang="ts">
import dayjs from 'dayjs'

interface IHabit {
	id: string
	created_at: string
	description: string
	emoji: string
	time_of_day: 'anytime' | 'morning' | 'afternoon' | 'evening' | 'night' | 'weekend'
}

interface IHabitEntry {
	id: string
	habit_id: string
	state: 'completed' | 'missed' | 'skipped'
	date: string
}

const habits = ref<IHabit[]>([
	{
		id: '1',
		created_at: '2023-01-02',
		description: 'Drink a cup of water',
		emoji: '💧',
		time_of_day: 'morning',
	},
	{
		id: '2',
		created_at: '2023-01-02',
		description: 'Eat a healthy breakfast',
		emoji: '🍳',
		time_of_day: 'morning',
	},
	{
		id: '3',
		created_at: '2023-01-02',
		description: 'Don\'t eat after 8pm',
		emoji: '🍕',
		time_of_day: 'night',
	},
])

const habitEntries = ref<IHabitEntry[]>([
	{
		id: '1',
		habit_id: '1',
		state: 'completed',
		date: '2023-01-01',
	},
	{
		id: '2',
		habit_id: '2',
		state: 'completed',
		date: '2023-01-01',
	},
	{
		id: '3',
		habit_id: '3',
		state: 'completed',
		date: '2023-01-01',
	},
	{
		id: '4',
		habit_id: '1',
		state: 'completed',
		date: '2023-01-02',
	},
	{
		id: '5',
		habit_id: '2',
		state: 'completed',
		date: '2023-01-02',
	},
	{
		id: '6',
		habit_id: '3',
		state: 'completed',
		date: '2023-01-02',
	},
	{
		id: '7',
		habit_id: '1',
		state: 'completed',
		date: '2023-01-04',
	},
	{
		id: '8',
		habit_id: '2',
		state: 'completed',
		date: '2023-01-04',
	},
	{
		id: '9',
		habit_id: '3',
		state: 'completed',
		date: '2023-01-04',
	},
	{
		id: '10',
		habit_id: '1',
		state: 'completed',
		date: '2023-01-06',
	},
	{
		id: '11',
		habit_id: '2',
		state: 'completed',
		date: '2023-01-06',
	},
	{
		id: '12',
		habit_id: '3',
		state: 'skipped',
		date: '2023-01-06',
	},
])

const computedLastDay = computed(() => dayjs().daysInMonth())

const computedTableData = computed(() => {
	const tableData = []
	for (const habit of habits.value) {
		const habitData: Record<string, string | undefined> = {
			title: `${habit.emoji} ${habit.description}`,
		}

		for (let i = 1; i <= computedLastDay.value; i++) {
			const date = dayjs().date(i).format('YYYY-MM-DD')
			habitData[date] = habitEntries.value.find((entry) => {
				return entry.habit_id === habit.id && entry.date === date
			})?.state
		}
		tableData.push(habitData)
	}
	return tableData
})
</script>

<template>
  <Variant
    title="Register Form"
  >
    <JTable :data="computedTableData" />
  </Variant>
</template>
