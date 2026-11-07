<script setup lang="ts">
const { data: posts } = await useAsyncData('writing-list', () => {
  const query = queryCollection('writing')
    .select('path', 'title', 'description', 'date')
    .order('date', 'DESC')

  return import.meta.dev ? query.all() : query.where('draft', '=', false).all()
})

const siteUrl = useRuntimeConfig().public.siteUrl

usePageSeo({
  title: 'Writing',
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

      <WritingList
        v-if="posts?.length"
        :posts="posts"
        class="mt-6"
      />

      <p
        v-else
        class="mt-10 text-muted"
      >
        Nothing published yet.
      </p>
    </div>
  </UContainer>
</template>
