/** @type {import('tailwindcss').Config} */

const content = [
	'./src/runtime/components/*.vue',
	'./src/runtime/layouts/*.vue',
	'./src/runtime/pages/*.vue',
]

if (process.env.NUXT_MODULE_ENV === 'development') {
	content.push('./playground/components/**/*.vue')
	content.push('./playground/layouts/**/*.vue')
	content.push('./playground/pages/**/*.vue')
}

module.exports = {
	prefix: 'nxs-',
	content,
	theme: {
		extend: {},
	},
	plugins: [],
}
