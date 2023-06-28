/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		'./stories/**/*.vue',
		'./components/**/*.vue',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./composables/**/*.ts',
		'./app.vue',
	],
	theme: {
		extend: {
			boxShadow: {
				button: [
					'0px -1px 0px 0px hsla(0, 0%, 100%, 0.04)',
					'0px 0px 0px 1px hsla(0, 0%, 100%, 0.12)',
					'0px 0px 1px 0px rgba(0, 0, 0, 0.04)',
					'0px 2px 2px 0px rgba(0, 0, 0, 0.04)',
					'0px 4px 2px 0px rgba(0, 0, 0, 0.04)',
					'0px 6px 3px 0px rgba(0, 0, 0, 0.04)',
				],
			},
			boxShadowColor: {
				'base-shadow-color': 'rgba(0, 0, 0, 0.16)',
			},
			dropShadow: {
				'button-drop': ['0 1px 0px rgba(0, 0, 0, 0.4)', '0 1px 1px rgba(0, 0, 0, 0.4)'],
			},
		},
		colors: {
			'gray1': 'hsl(0 0% 8.5%)',
			'gray2': 'hsl(0 0% 11%)',
			'gray3': 'hsl(0 0% 13.6%)',
			'gray4': 'hsl(0 0% 15.8%)',
			'gray5': 'hsl(0 0% 17.9%)',
			'gray6': 'hsl(0 0% 20.5%)',
			'gray7': 'hsl(0 0% 24.3%)',
			'gray8': 'hsl(0 0% 31.2%)',
			'gray9': 'hsl(0 0% 49.4%)',
			'gray10': 'hsl(0 0% 56.3%)',
			'gray11': 'hsl(0 0% 62.8%)',
			'gray12': 'hsl(0 0% 92.6%)',
			'white': 'hsl(0 0% 96.0%)',
			'whiter': 'hsl(0 0% 100%)',
			'grayA1': 'hsl(0 0% 100% / .08)',
			'grayA12': 'hsl(0 0% 8.5% / .420)',

			'black': 'hsl(0 0% 1.8%)',
			'gray-0': 'hsl(0 0% 7.3%)',
			'gray-1': 'hsl(0 0% 12.4%)',
			'gray-2': 'hsl(0 0% 28.4%)',
			'gray-3': 'hsl(0 0% 42.069%)',

			'primary': 'hsl(180deg 80% 20%)',
			'error': 'hsl(0deg 100% 50%)',
			'transparent': 'transparent',
		},
		fontFamily: {
			inter: ['Inter', 'monospace'],
		},
	},
	corePlugins: {
		textOpacity: false,
		backgroundOpacity: false,
		borderOpacity: false,
	},
}
