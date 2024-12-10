import { addTranslations, setLocale, setRoute } from "$lib/translations";

export const load = async ({ data }) => {
  const { preferredLanguage, route, translations } = data;

  addTranslations(translations);

  await setRoute(route);
  await setLocale(preferredLanguage);

  return {};
};