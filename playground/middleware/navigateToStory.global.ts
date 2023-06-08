// TODO: figue out why auto import doesn't work here
import { defineNuxtRouteMiddleware, navigateTo } from '#imports'

export default defineNuxtRouteMiddleware((to) => {
	if (to.path === '/story')
		return

	return navigateTo('/story')
})
