# Nuxt Simple Stories 🚧 WIP

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Simple stories to work on components in isolation.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/nuxt-simple-stories?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Quick Setup

1. Add `nuxt-simple-stories` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-simple-stories
```

2. Add `nuxt-simple-stories` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
	modules: [
		'nuxt-simple-stories'
	]
})
```

That's it! You can now use Nuxt Simple Stories in your Nuxt app ✨

## Development

```bash
# Install dependencies
pnpm install

# Generate type stubs
pnpm dev:prepare

# Develop with the playground
pnpm dev

# Build the playground
pnpm dev:build

# Run ESLint
pnpm lint

# Run Vitest
pnpm test
pnpm test:watch

# Release new version
pnpm release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-simple-stories/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-simple-stories

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-simple-stories.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-simple-stories

[license-src]: https://img.shields.io/npm/l/nuxt-simple-stories.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-simple-stories

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com

## Todos

- [ ] Config
  - [ ] `storiesDir`
  - [ ] `storiesExtensions`

- [ ] UI
  - [ ] Basic styles for built in components (story, variant)
  - [ ] Light/Dark mode
  - [ ] ? Customizable

- [ ] Examples
- [ ] "Docs"
