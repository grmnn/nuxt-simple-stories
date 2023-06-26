<script setup lang="ts">
import { ref } from '#imports'

const msg = ref('hello')
</script>

<template>
  <Variant title="Primary Button">
    <BaseButton variant="primary">
      Primary Button
    </BaseButton>
  </Variant>
  <Variant title="Secondary Button">
    <BaseButton variant="secondary">
      {{ msg }}
    </BaseButton>
  </Variant>
</template>
