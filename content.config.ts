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
        tier: z.enum(['project', 'archive']),
        featured: z.boolean().default(false),
        tech: z.array(z.string()).default([]),
        pitch: z.string().optional(),
        npm: z.string().url().optional(),
      }),
    }),
    profile: defineCollection({
      type: 'data',
      source: 'profile.yml',
      schema: z.object({
        name: z.string(),
        title: z.string(),
        focus: z.string(),
        email: z.string(),
        github: z.string().url(),
        linkedin: z.string().url(),
        career: z.array(z.object({
          title: z.string(),
          company: z.string(),
          start: z.string(),
          end: z.string().optional(),
        })),
        tech: z.array(z.object({
          label: z.string(),
          items: z.array(z.string()),
        })),
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
