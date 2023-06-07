<script setup lang="ts">
</script>

<template>
  <Variant title="Basic Auth Form">
    <form>
      <div class="flex flex-col gap-2">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
        >
      </div>
      <div class="flex flex-col gap-2">
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
        >
      </div>
      <div class="flex flex-col gap-2">
        <button type="submit">
          Submit
        </button>
      </div>
    </form>
  </Variant>
</template>

<style scoped>
</style>
