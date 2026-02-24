import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tech: z.array(z.string()),
    category: z.enum(['embedded', 'web', 'devtools', 'finance', 'research', 'ai', 'infra']),
    github: z.string().url().optional(),
    url: z.string().url().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    image: z.string().startsWith('/').optional(),
  }),
});

export const collections = { projects };
