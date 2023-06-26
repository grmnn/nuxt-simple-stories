<script setup lang="ts">

</script>

<template>
  <Variant
    title="Default"
    class="bg-gray-0"
  >
    <JButton variant="primary">
      Primary
    </JButton>

    <JButton
      to="/page"
      variant="secondary"
    >
      Secondary
    </JButton>
  </Variant>

  <Variant
    title="Sizes"
    class="bg-gray-0"
  >
    <JButton>Default Button</JButton>

    <JButton small>
      Small Button
    </JButton>
    <JButton variant="secondary">
      Default Button
    </JButton>

    <JButton
      small
      variant="secondary"
    >
      Small Button
    </JButton>
  </Variant>

  <Variant
    title="Prefix and Suffix"
    class="bg-gray-0"
  >
    <JButton icon="upload">
      Prefix Icon
    </JButton>

    <JButton icon-right="upload">
      Suffix Icon
    </JButton>
    <JButton
      icon="upload"
      icon-right="upload"
      small
    >
      Pre & Suffix Icon
    </JButton>
    <JButton
      icon="upload"
      variant="secondary"
    >
      Prefix Icon
    </JButton>

    <JButton
      icon-right="upload"
      variant="secondary"
    >
      Suffix Icon
    </JButton>
    <JButton
      icon="upload"
      icon-right="upload"
      variant="secondary"
      small
    >
      Pre & Suffix Icon
    </JButton>
  </Variant>

  <Variant
    title="Icon Only"
    class="bg-gray-0"
  >
    <JButton icon="delete" />

    <JButton
      icon="delete"
      small
    />
    <JButton
      icon="delete"
      variant="secondary"
    />

    <JButton
      icon="delete"
      variant="secondary"
      small
    />
  </Variant>

  <Variant
    title="Types"
    class="bg-gray-0"
  >
    <JButton>Primary Button</JButton>
    <JButton variant="secondary">
      Secondary Button
    </JButton>

    <JButton variant="error">
      Error Button
    </JButton>
  </Variant>

  <Variant
    title="Disabled"
    class="bg-gray-0"
  >
    <JButton
      small
      :disabled="true"
    >
      Confirm
    </JButton>
    <JButton :disabled="true">
      Confirm
    </JButton>
    <JButton
      small
      :disabled="true"
      variant="secondary"
    >
      Confirm
    </JButton>
    <JButton
      :disabled="true"
      variant="secondary"
    >
      Confirm
    </JButton>
  </Variant>
</template>
