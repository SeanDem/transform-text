/** @type {import('tailwindcss').Config} */
export default {
	purge: {
		content: ["./src/**/*.svelte"],
		options: {
			whitelistPatterns: [/svelte-/],
		},
	},
	daisyui: {
		themes: [
			'light',
			'dark',
			'cupcake',
			'bumblebee',
			'emerald',
			'corporate',
			'synthwave',
			'retro',
			'cyberpunk',
			'valentine',
			'halloween',
			'garden',
			'forest',
			'aqua',
			'lofi',
			'pastel',
			'fantasy',
			'wireframe',
			'black',
			'luxury',
			'dracula',
			'cmyk',
			'autumn',
			'business',
			'acid',
			'lemonade',
			'night',
			'coffee',
			'winter',
			'dim',
			'nord',
			'sunset'
		]
	},
	variants: {},
	plugins: [require("daisyui")],
};
