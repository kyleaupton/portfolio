<script setup lang="ts">
import type { ContentSurroundLink } from '@nuxt/ui'

const route = useRoute()
const siteUrl = useRuntimeConfig().public.siteUrl

const { data: post, error } = await useAsyncData(route.path, async () => {
  const query = queryCollection('writing').path(route.path)
  const post = await (import.meta.dev ? query.first() : query.where('draft', '=', false).first())
  if (!post) throw createError({ statusCode: 404, statusMessage: 'Post not found' })
  return post
})

throwIfFailed(error.value)

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  const query = queryCollectionItemSurroundings('writing', route.path, { fields: ['description'] })
    .order('date', 'ASC')
  return import.meta.dev ? query : query.where('draft', '=', false)
})

const WORDS_PER_MINUTE = 230

function countWords(node: unknown): number {
  if (typeof node === 'string') {
    return node.split(/\s+/).filter(Boolean).length
  }
  // Minimark nodes are [tag, props, ...children]; skip the props object
  if (Array.isArray(node)) {
    return node.slice(typeof node[0] === 'string' ? 2 : 0).reduce((sum, child) => sum + countWords(child), 0)
  }
  return 0
}

const readingTime = computed(() => {
  const body = post.value?.body as { value?: unknown[] } | undefined
  return Math.max(1, Math.round(countWords(body?.value ?? []) / WORDS_PER_MINUTE))
})

const formattedDate = computed(() => new Date(post.value!.date).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  // Dates are midnight UTC; formatting in local time would shift them a day for US visitors
  timeZone: 'UTC',
}))

if (post.value) {
  usePageSeo({
    title: post.value.title,
    description: post.value.description,
  })

  useSeoMeta({
    ogType: 'article',
    // An undefined value would clear the site-wide default image instead of falling back to it
    ...(post.value.cover ? { ogImage: new URL(post.value.cover, siteUrl).href } : {}),
    articlePublishedTime: new Date(post.value.date).toISOString(),
  })
}
</script>

<template>
  <UContainer
    v-if="post"
    class="py-12 sm:py-16"
  >
    <article class="mx-auto max-w-[68ch]">
      <header class="mb-10">
        <UButton
          to="/writing"
          label="Writing"
          icon="i-lucide-arrow-left"
          color="neutral"
          variant="link"
          class="-ms-2.5 mb-6"
        />

        <h1 class="text-4xl font-bold tracking-tight text-balance text-highlighted sm:text-5xl">
          {{ post.title }}
        </h1>

        <p
          v-if="post.description"
          class="mt-4 text-lg text-pretty text-muted"
        >
          {{ post.description }}
        </p>

        <div class="mt-6 flex items-center gap-2 text-sm text-muted">
          <time :datetime="new Date(post.date).toISOString()">{{ formattedDate }}</time>
          <span aria-hidden="true">·</span>
          <span>{{ readingTime }} min read</span>
          <UBadge
            v-if="post.draft"
            label="Draft"
            color="warning"
            variant="subtle"
            size="sm"
          />
        </div>
      </header>

      <img
        v-if="post.cover"
        :src="post.cover"
        alt=""
        class="mb-10 w-full rounded-lg border border-default"
      >

      <ContentRenderer
        :value="post"
        class="text-lg/8"
      />

      <USeparator class="my-12" />

      <UContentSurround :surround="(surround as ContentSurroundLink[] | undefined)" />
    </article>
  </UContainer>
</template>
