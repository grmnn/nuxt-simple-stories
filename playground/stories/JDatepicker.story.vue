<script setup lang="ts">
import dayjs from 'dayjs'

const date3 = ref(dayjs())
const date4 = ref(dayjs())
</script>

<template>
  <Variant
    title="Datepicker"
    type="col"
  >
    <JDatepicker
      v-model="date3"
    />
    {{ date3.format('DD.MM.YYYY') }}
  </Variant>
  <Variant
    title="Datepicker with background"
    type="col"
  >
    <JDatepicker
      v-model="date3"
      class="border border-grayA1 bg-gray3"
    />
    {{ date3.format('DD.MM.YYYY') }}
  </Variant>
  <Variant
    title="Datepicker - Future Dates Disabled"
    type="col"
  >
    <JDatepicker
      v-model="date4"
      :disable-future-dates="true"
    />
    {{ date4.format('DD.MM.YYYY') }}
  </Variant>
</template>
