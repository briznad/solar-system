import vercelAdapter from '@sveltejs/adapter-vercel'
import { sveltePreprocess } from "svelte-preprocess";


/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess : sveltePreprocess(),
	kit        : {
		adapter : vercelAdapter({}),
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
