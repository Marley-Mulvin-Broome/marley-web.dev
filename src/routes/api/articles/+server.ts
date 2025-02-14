import { getArticles } from '$lib/articles';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const articles = await getArticles();
	return json(articles);
};
