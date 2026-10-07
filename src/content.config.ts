import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdoc}', base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    menuOrder: z.number().optional(),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdoc}', base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    author: z.string().default('Admin K3'),
    category: z.enum(['Regulasi', 'Teknis', 'Case Study', 'Tips & Panduan', 'Layanan Lokal']),
    tags: z.array(z.string()).default([]),
    readTime: z.string().optional(),
  }),
});

export const collections = { pages, articles };
