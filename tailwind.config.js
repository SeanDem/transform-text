/** @type {import('tailwindcss').Config} */
export default {
	purge: {
		content: ["./src/**/*.svelte"],
		options: {
			whitelistPatterns: [/svelte-/],
		},
	},
	theme: {
		extend: {},
	},
	variants: {},
	plugins: [require("daisyui")],
};
