export type ArticleCategory = 'Tutorial' | 'Project' | 'Opinion' | 'Other';

export interface Article {
	title: string;
	slug: string;
	description: string;
	date: Date;
	lastUpdate: Date;
	category: ArticleCategory;
	published: boolean;
	img: string;
}
