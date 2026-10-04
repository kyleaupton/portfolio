<script setup lang="ts">
const { data: posts } = await useAsyncData('writing-list', () => {
  const query = queryCollection('writing')
    .select('path', 'title', 'description', 'date')
    .order('date', 'DESC')

  return import.meta.dev ? query.all() : query.where('draft', '=', false).all()
})

const siteUrl = useRuntimeConfig().public.siteUrl

useSeoMeta({
  title: 'Writing · Kyle Upton',
  description: 'Notes and articles by Kyle Upton.',
})

useHead({
  link: [
    { rel: 'canonical', href: `${siteUrl}/writing` },
    { rel: 'alternate', type: 'application/rss+xml', title: 'Kyle Upton', href: '/rss.xml' },
  ],
})
</script>

<template>
  <UContainer class="py-12 sm:py-16">
    <div class="mx-auto max-w-[68ch]">
      <h1 class="text-3xl font-semibold tracking-tight text-highlighted sm:text-4xl">
        Writing
      </h1>

      <UBlogPosts
        v-if="posts?.length"
        orientation="vertical"
        class="mt-6 gap-y-2 lg:gap-y-2"
      >
        <UBlogPost
          v-for="post in posts"
          :key="post.path"
          :title="post.title"
          :description="post.description"
          :date="post.date"
          :to="post.path"
          variant="ghost"
          :ui="{ body: 'px-0 py-4 sm:px-0 sm:py-4' }"
        />
      </UBlogPosts>

      <p
        v-else
        class="mt-10 text-muted"
      >
        Nothing published yet.
      </p>
    </div>
  </UContainer>
</template>
