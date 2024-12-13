import i18n, { type Config } from 'sveltekit-i18n';
import lang from './lang.json';
import type { Cookies } from '@sveltejs/kit';

const config: Config = ({
  fallbackLocale: 'en',
  translations: {
    en: { 
      lang
    },
    ja: { 
      lang
    }
  },
  loaders: [
    {
      locale: 'en',
      key: 'common',
      loader: async () => (
        await import('./en.json')
      ).default,
    },
    {
      locale: 'ja',
      key: 'common',
      loader: async () => (
        await import('./ja.json')
      ).default,
    },
  ],
});

export const defaultLocale = 'en';

export const guessUserLanguage = (cookies: Cookies, request: Request) => {
  let locale = (cookies.get('lang') || '').toLowerCase();

  // Get user preferred locale
 	if (!locale) {
		// If no cookie is set, try to determine the locale from the 'Accept-Language' header
		const acceptLanguageHeader = request.headers.get('accept-language') || '';
		// Attempt to match the language code with optional region code
		let match = acceptLanguageHeader.match(/^[a-z]+(?=[-_])/i);

		// If no match is found, try to match just the language code
		if (!match) {
			match = acceptLanguageHeader.match(/^[a-z]+/i);
		}

		// If a match is found, use it as the locale, otherwise fall back to the default locale
		locale = match ? match[0].toLowerCase() : defaultLocale;
	}

   // Get defined locales
  const supportedLocales = locales.get().map((l) => l.toLowerCase());

  // Use default locale if current locale is not supported
  if (!supportedLocales.includes(locale)) {
    locale = defaultLocale;
  }

  return locale
}

export const { t, locale, locales, loading, loadTranslations, setLocale, setRoute, addTranslations, translations } = new i18n(config);