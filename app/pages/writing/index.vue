<script setup lang="ts">
const { data: posts } = await useAsyncData('writing-list', () => {
  const query = queryCollection('writing')
    .select('path', 'title', 'description', 'date')
    .order('date', 'DESC')

  return import.meta.dev ? query.all() : query.where('draft', '=', false).all()
})

const items = computed(() => (posts.value ?? []).map(post => ({
  key: post.path,
  to: post.path,
  title: post.title,
  description: post.description,
  date: post.date,
})))

usePageSeo({
  title: 'Writing',
  description: 'Notes and articles by Kyle Upton.',
})

useHead({
  link: [
    { rel: 'alternate', type: 'application/rss+xml', title: 'Kyle Upton', href: '/rss.xml' },
  ],
})
</script>

<template>
  <div class="mx-auto flex max-w-4xl flex-col gap-14 px-6 py-12 sm:py-16">
    <header>
      <h1 class="text-3xl font-semibold tracking-tight text-highlighted">
        Writing
      </h1>
      <p class="mt-2 text-muted">
        Notes and articles.
      </p>
    </header>

    <LinkList
      v-if="items.length"
      :items="items"
    />

    <p
      v-else
      class="text-muted"
    >
      Nothing published yet.
    </p>
  </div>
</template>
