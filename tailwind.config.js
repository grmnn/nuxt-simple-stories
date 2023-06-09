/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/runtime/components/*.vue',
		'./src/runtime/layouts/*.vue',
		'./src/runtime/pages/*.vue',

		'./playground/components/**/*.vue',
		'./playground/layouts/**/*.vue',
		'./playground/pages/**/*.vue',
	],
	theme: {
		extend: {},
	},
	plugins: [],
}
