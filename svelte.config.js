import adapter from '@sveltejs/adapter-static'
import { sveltePreprocess } from "svelte-preprocess";


/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess : sveltePreprocess(),
	kit        : {
		adapter : adapter({
			pages       : 'build',
			assets      : 'build',
			fallback    : 'index.html',
			precompress : false,
		}),
		alias   : {
			// file path shortcuts
			'$actions'    : './src/lib/actions',
			'$components' : './src/lib/components',
			'$services'   : './src/lib/services',
			'$stores'     : './src/lib/stores',
			'$types'      : './src/lib/types',
			'$utilities'  : './src/lib/utilities',
			'$images'     : './src/lib/images',
		},
	},
};

export default config;
