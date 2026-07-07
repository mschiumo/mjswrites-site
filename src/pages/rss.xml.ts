import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, postUrl } from '../lib/posts';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: 'MJS Writes — The Journal',
    description:
      'Essays and poems on bipolar disorder, mental health, love, and the craft of putting hard things into words — from author Michael J. Schiuma.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt,
      link: postUrl(post),
      categories: post.data.categories,
    })),
    customData: '<language>en-us</language>',
  });
}
