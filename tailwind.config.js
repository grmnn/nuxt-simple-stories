/** @type {import('tailwindcss').Config} */

const content = [
	'./src/runtime/components/*.vue',
	'./src/runtime/layouts/*.vue',
	'./src/runtime/pages/*.vue',
]

if (process.env.MODULE_ENV === 'development') {
	content.push('./playground/components/**/*.vue')
	content.push('./playground/layouts/**/*.vue')
	content.push('./playground/pages/**/*.vue')
}

console.log('content', content)

module.exports = {
	prefix: 'nxs-',
	content,
	theme: {
		extend: {},
	},
	plugins: [],
}
