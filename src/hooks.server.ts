import { guessUserLanguage } from '$lib/translations';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const lang = guessUserLanguage(event.cookies, event.request);

	event.locals.lang = lang;

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
};
