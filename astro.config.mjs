// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://mjswrites.com';

/** Open links to other sites from post bodies in a new tab. */
function rehypeExternalLinks() {
  /** @param {any} node */
  const visit = (node) => {
    if (node.type === 'element' && node.tagName === 'a') {
      const href = String(node.properties?.href ?? '');
      if (/^https?:\/\//i.test(href) && new URL(href).origin !== SITE && new URL(href).hostname !== 'www.mjswrites.com') {
        node.properties.target = '_blank';
        node.properties.rel = ['noopener', 'noreferrer'];
      }
    }
    node.children?.forEach(visit);
  };
  return visit;
}

export default defineConfig({
  site: SITE,
  integrations: [sitemap()],
  markdown: {
    rehypePlugins: [rehypeExternalLinks],
  },
});
