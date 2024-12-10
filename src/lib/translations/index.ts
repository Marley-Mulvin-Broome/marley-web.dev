import i18n, { type Config } from 'sveltekit-i18n';
import lang from './lang.json';

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

export const { t, locale, locales, loading, loadTranslations, setLocale, setRoute, addTranslations, translations } = new i18n(config);