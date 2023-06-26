<script lang="ts" setup>
const inputValue = ref('Disabled with value')
</script>

<template>
  <Variant
    class="bg-gray-0"
    title="Sizes"
  >
    <JInput
      placeholder="Small"
      small
    />
    <JInput placeholder="Default" />
  </Variant>

  <Variant
    class="bg-gray-0"
    title="Sizes, Prefix and Suffix"
  >
    <JInput
      placeholder="Small Prefix"
      small
      prefix="upload"
    />
    <JInput
      placeholder="Default Suffix"
      suffix="upload"
    />
    <JInput
      placeholder="Default Prefix & Suffix"
      prefix="upload"
      suffix="upload"
    />
  </Variant>

  <Variant
    class="bg-gray-0"
    title="Disabled"
  >
    <JInput
      placeholder="Disabled icon"
      small
      prefix="upload"
      :disabled="true"
    />
    <JInput
      placeholder="Disabled no icon"
      :disabled="true"
    />
    <JInput
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
    <JInput
      placeholder="E-Mail"
      prefix="upload"
      error-message="Please use a valid e-mail."
    />
  </Variant>
</template>
