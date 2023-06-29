<script setup lang="ts">

</script>

<template>
  <Variant
    title="Default"
    class="bg-gray-0"
  >
    <BaseButton variant="primary">
      Primary
    </BaseButton>

    <BaseButton
      to="#page"
      variant="secondary"
    >
      Secondary
    </BaseButton>
  </Variant>

  <Variant
    title="Sizes"
    class="bg-gray-0"
  >
    <BaseButton>Default Button</BaseButton>

    <BaseButton small>
      Small Button
    </BaseButton>
    <BaseButton variant="secondary">
      Default Button
    </BaseButton>

    <BaseButton
      small
      variant="secondary"
    >
      Small Button
    </BaseButton>
  </Variant>

  <Variant
    title="Prefix and Suffix"
    class="bg-gray-0"
  >
    <BaseButton icon="upload">
      Prefix Icon
    </BaseButton>

    <BaseButton icon-right="upload">
      Suffix Icon
    </BaseButton>
    <BaseButton
      icon="upload"
      icon-right="upload"
      small
    >
      Pre & Suffix Icon
    </BaseButton>
    <BaseButton
      icon="upload"
      variant="secondary"
    >
      Prefix Icon
    </BaseButton>

    <BaseButton
      icon-right="upload"
      variant="secondary"
    >
      Suffix Icon
    </BaseButton>
    <BaseButton
      icon="upload"
      icon-right="upload"
      variant="secondary"
      small
    >
      Pre & Suffix Icon
    </BaseButton>
  </Variant>

  <Variant
    title="Icon Only"
    class="bg-gray-0"
  >
    <BaseButton icon="delete" />

    <BaseButton
      icon="delete"
      small
    />
    <BaseButton
      icon="delete"
      variant="secondary"
    />

    <BaseButton
      icon="delete"
      variant="secondary"
      small
    />
  </Variant>

  <Variant
    title="Types"
    class="bg-gray-0"
  >
    <BaseButton>Primary Button</BaseButton>
    <BaseButton variant="secondary">
      Secondary Button
    </BaseButton>

    <BaseButton variant="error">
      Error Button
    </BaseButton>
  </Variant>

  <Variant
    title="Disabled"
    class="bg-gray-0"
  >
    <BaseButton
      small
      :disabled="true"
    >
      Confirm
    </BaseButton>
    <BaseButton :disabled="true">
      Confirm
    </BaseButton>
    <BaseButton
      small
      :disabled="true"
      variant="secondary"
    >
      Confirm
    </BaseButton>
    <BaseButton
      :disabled="true"
      variant="secondary"
    >
      Confirm
    </BaseButton>
  </Variant>
</template>
