import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

export function useScreen() {
	const breakpoints = useBreakpoints(breakpointsTailwind)

	return {
		isSm: breakpoints.smallerOrEqual('sm'),
		isMd: breakpoints.smallerOrEqual('md'),
		isLg: breakpoints.smallerOrEqual('lg'),
		isXl: breakpoints.smallerOrEqual('xl'),

		isMobile: breakpoints.smaller('sm'),
		isTablet: breakpoints.smallerOrEqual('sm') && breakpoints.smaller('lg'),
		isDesktop: breakpoints.greater('lg'),
	}
}
