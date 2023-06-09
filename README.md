# Nuxt Simple Stories

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Simple stories for [Nuxt](https://nuxt.com/). Work on your components in isolation with zero configuration. Also enabled in your [Nuxt DevTools](https://github.com/nuxt/devtools)

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
- [📖 &nbsp;Example](https://nuxt-simple-stories.vercel.app/)

## Getting Started

### Installation

```bash
pnpm add -D nuxt-simple-stories
```

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-simple-stories'
  ],
  // optional configuration
  simpleStories: {
    // Set to false to deploy stories to production. (default: true)
    devOnly: true,
  }
})
```

<!-- For all options available, please refer to TSDocs in your IDE. -->

### Usage

Create a `stories` folder in the root of your Nuxt project. Create a `*.story.vue` file for each story you want to create. The name of the file will be used as the name of the story. Directories will be used to show a tree view in the UI.

```vue
<script setup lang="ts">
// this is just another Nuxt 3 component, so you can use all the same features like auto imports, Pinia store, etc.
</script>

<template>
  <Variant title="Base Button">
    <BaseButton variant="primary">
      Primary Button
    </BaseButton>
    <BaseButton variant="secondary">
      Secondary Buttton
    </BaseButton>
  </Variant>
  <Variant title="Disabled buttons">
    <BaseButton
      variant="primary"
      disabled
    >
      Primary Button
    </BaseButton>
    <BaseButton
      variant="secondary"
      disabled
    >
      Secondary Buttton
    </BaseButton>
  </Variant>
</template>
```

The `Variant` component can be used to group for example different states of a component. The `title` prop will be used as the name of the variant.

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-simple-stories/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-simple-stories

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-simple-stories.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-simple-stories

[license-src]: https://img.shields.io/npm/l/nuxt-simple-stories.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-simple-stories

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
