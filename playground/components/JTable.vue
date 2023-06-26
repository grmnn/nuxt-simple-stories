<script setup lang="ts">
interface ITableProps {
	data: Record<string, string | undefined>[]
}
defineProps<ITableProps>()
</script>

<template>
  <div class="my-8 overflow-scroll shadow-sm">
    <table class="w-full table-auto border-collapse text-sm">
      <thead class="text-sm">
        <tr>
          <th
            v-for="(item, index) in Object.keys(data[0])"
            :key="index"
            class="whitespace-nowrap border-b px-4"
            :class="{
              'bg-black sticky left-0': index === 0,
            }"
          >
            {{ item }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in data"
          :key="rowIndex"
          class="border-b"
        >
          <td
            v-for="(cellData, cellKey, cellIndex) in row"
            :key="cellIndex"
            :class="{
              'bg-black sticky left-0 whitespace-nowrap': cellIndex === 0,
            }"
          >
            {{ cellData }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
