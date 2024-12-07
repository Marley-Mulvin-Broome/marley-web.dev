import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#17181c',
					light: '#23262f'
				},
				accent: {
					DEFAULT: '#b3c7ff'
				}
			},
			fontFamily: {
				'sans': ['inter'],
				'mono': ['ubuntu-mono', 'ui-monospace']
			},
			fontSize: {
				'6xl': '4rem',
				'5xl': '2.625rem',
				'4xl': '2.1875rem',
				'3xl': '1.8125rem',
				'2xl': '1.5rem',
				'xl': '1.25rem',
				'lg': '1.125rem',
				'base': '1rem',
				'sm': '0.875rem',
				'xs': '0.8125rem',
				'2xs': '0..75rem',
			},
		},
	},
	plugins: [],
} satisfies Config;
