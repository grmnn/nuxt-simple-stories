/** @type {import('tailwindcss').Config} */

const content = [
	'./src/runtime/components/*.vue',
	'./src/runtime/layouts/*.vue',
	'./src/runtime/pages/*.vue',
]

module.exports = {
	prefix: 'nxs-',
	content,
	theme: {
		extend: {},
	},
	plugins: [],
}
