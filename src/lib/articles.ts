import type { Article } from "./types";

export const getArticles = async () => {
  const articles: Article[] = []

  const paths = import.meta.glob('/src/articles/*.svx', { eager: true });

  for (const path in paths) {
    const file = paths[path];
    const slug = path.split('/').at(-1)?.replace('.svx', '');

    if (file && typeof file === 'object' && 'metadata' in file && slug) {
      const metadata = file.metadata as Omit<Article, 'slug'>;
      
      if (!metadata.published) {
        continue;
      }

      articles.push({
        ...metadata,
        date: new Date(metadata.date),
        lastUpdate: new Date(metadata.lastUpdate),
        slug
      })
    }
  }

  return articles.sort((a, b) => b.date.getTime() - a.date.getTime());
}
