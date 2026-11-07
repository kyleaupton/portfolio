<script setup lang="ts">
defineProps<{
  posts: { path: string, title: string, description?: string, date: string | Date }[]
}>()
</script>

<template>
  <UBlogPosts
    orientation="vertical"
    class="gap-y-2 lg:gap-y-2"
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
</template>
