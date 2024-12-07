import { getArticles } from "$lib/articles";
import { createSearchIndex, search } from "$lib/search";
import type { SearchIndexItem } from "$lib/types";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const prerender = true;

const customSearchitems: SearchIndexItem[] = [
  {
    title: "About Me",
    content: "Learn more about Marley",
    href: "/folders/about-me",
    type: "page"
  },
  {
    title: "Contact",
    content: "Get in touch with me",
    href: "/folders/contact",
    type: "page"
  },
  {
    title: "Projects",
    content: "Check out my projects",
    href: "/folders/projects",
    type: "folder"
  }
];

const initialiseSearchIndex = async () => {
  const articles = await getArticles();

  function *itemsGenerator(): Generator<SearchIndexItem> {
    // TODO: Add article content
    for (const article of articles) {
      yield {
        href: `/folders/articles/${article.slug}`,
        title: article.title,
        content: `${article.description}`,
        type: 'article'
      }
    }

    yield* customSearchitems;
  }

  createSearchIndex(itemsGenerator());
}

initialiseSearchIndex();

export const GET: RequestHandler = async ({ url }) => {
  const query = url.searchParams.get('q') || '';

  const results = await search(query);
  
  return json({
    results
  });
};