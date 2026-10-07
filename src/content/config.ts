import { defineCollection, z } from astro:content;

const articles = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date().optional(),
    author: z.string().optional(),
    tags: z.array(z.string()).default([]),
    category: z.string().optional(),
  }),
  // Pakai layout kustom yang sudah kita buat
  layout: ../../layouts/ArticleLayout.astro,
});

export const collections = { articles };