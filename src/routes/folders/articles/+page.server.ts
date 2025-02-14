import type { Article } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const response = await fetch('/api/articles');
	const articles = (await response.json()) as Article[];

	return {
		articles: articles.map((article) => ({
			...article,
			date: new Date(article.date),
			lastUpdate: new Date(article.lastUpdate)
		}))
	};
};
