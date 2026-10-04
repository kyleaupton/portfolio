import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'data',
      source: 'projects/*.yml',
      schema: z.object({
        repo: z.string(),
        name: z.string(),
        tier: z.enum(['product', 'project', 'archive']),
        featured: z.boolean().default(false),
        order: z.number().optional(),
        tech: z.array(z.string()).default([]),
        pitch: z.string().optional(),
        npm: z.string().url().optional(),
      }),
    }),
    writing: defineCollection({
      type: 'page',
      source: 'writing/*.md',
      schema: z.object({
        date: z.date(),
        draft: z.boolean().default(false),
        cover: z.string().optional(),
      }),
    }),
  },
})
