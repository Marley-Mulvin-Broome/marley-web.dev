import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import type { Article } from "$lib/types";

export const load: PageLoad = async ({ params }) => {
  try {
    const post = await import(`../../../../articles/${params.slug}.svx`);

    const meta = post.metadata as Omit<Article, 'slug'>;

    if (!meta.published) {
      throw new Error('Article not published');
    }


    return {
      article: {
        content: post.default,
        meta: {
          ...meta,
          date: new Date(meta.date),
          lastUpdate: new Date(meta.lastUpdate)
        }
      }
    }
  } catch (e) {
    console.error(e);
    error(404, `Article not found '${params.slug}'`);
  }
};