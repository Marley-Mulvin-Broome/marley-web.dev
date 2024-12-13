import { escapeSvelte, mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { createHighlighter } from 'shiki';

const theme = 'github-dark';

const highlighter = await createHighlighter({ themes: [theme], langs: ['javascript', 'typescript', 'css', 'json', 'markdown', 'bash', 'python', 'go', 'rust', 'svelte', 'html', 'xml', 'yaml', 'toml'] });

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	highlight: {
		highlighter: async (code, lang = "text") => {
			const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme }));
			return `{@html \`${html}\` }`;
		}
	},
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],

	kit: {
		adapter: adapter({
			regions: ["kix1"]
		})
	},

	extensions: ['.svelte', '.svx']
};

export default config;
