import { loadTranslations, translations } from '$lib/translations';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url, locals }) => {
	const { pathname } = url;

	const locale = locals.lang;

	await loadTranslations(locale, pathname); // keep this just before the `return`

	return {
		preferredLanguage: locale,
		route: pathname,
		translations: translations.get()
	};
};
