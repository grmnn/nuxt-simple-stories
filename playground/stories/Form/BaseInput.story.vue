<script lang="ts" setup>
const inputValue = ref('Disabled with value')
</script>

<template>
  <Variant
    class="bg-gray-0"
    title="Sizes"
  >
    <BaseInput
      placeholder="Small"
      small
    />
    <BaseInput placeholder="Default" />
  </Variant>

  <Variant
    class="bg-gray-0"
    title="Sizes, Prefix and Suffix"
  >
    <BaseInput
      placeholder="Small Prefix"
      small
      prefix="upload"
    />
    <BaseInput
      placeholder="Default Suffix"
      suffix="upload"
    />
    <BaseInput
      placeholder="Default Prefix & Suffix"
      prefix="upload"
      suffix="upload"
    />
  </Variant>

  <Variant
    class="bg-gray-0"
    title="Disabled"
  >
    <BaseInput
      placeholder="Disabled icon"
      small
      prefix="upload"
      :disabled="true"
    />
    <BaseInput
      placeholder="Disabled no icon"
      :disabled="true"
    />
    <BaseInput
      v-model="inputValue"
      placeholder="Disabled with value"
      prefix="upload"
      suffix="upload"
      :disabled="true"
    />
  </Variant>

  <Variant
    class="bg-gray-0"
    title="Error"
    type="col"
  >
    <BaseInput
      placeholder="E-Mail"
      prefix="upload"
      error-message="Please use a valid e-mail."
    />
  </Variant>
</template>
