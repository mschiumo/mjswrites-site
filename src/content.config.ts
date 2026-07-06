import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/blog' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    date: z.coerce.date(),
    categories: z.array(z.string()).default([]),
    excerpt: z.string().optional(),
    heroImage: z.string().optional(),
    heroCaption: z.string().optional(),
    heroCaptionUrl: z.string().optional(),
    originalUrl: z.string().optional(),
  }),
});

export const collections = { blog };
