<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'
import type { ProfileCollectionItem } from '@nuxt/content'

const props = defineProps<{
  profile: ProfileCollectionItem
}>()

const links = computed<ButtonProps[]>(() => [
  { label: 'Resume', icon: 'i-lucide-file-text', to: '/resume', external: true, target: '_blank' },
  { label: 'Email', icon: 'i-lucide-mail', to: `mailto:${props.profile.email}` },
  { label: 'GitHub', icon: 'i-simple-icons-github', to: props.profile.github, target: '_blank' },
  { label: 'LinkedIn', icon: 'i-simple-icons-linkedin', to: props.profile.linkedin, target: '_blank' },
])
</script>

<template>
  <header>
    <h1 class="text-3xl font-semibold tracking-tight text-highlighted sm:text-4xl">
      {{ profile.name }}
    </h1>
    <p class="mt-2 text-lg text-toned">
      {{ profile.title }}
    </p>
    <p class="mt-1 text-muted">
      {{ profile.focus }}
    </p>
    <nav class="mt-5 grid grid-cols-2 gap-x-4 gap-y-1 sm:flex sm:flex-wrap sm:gap-x-5">
      <UButton
        v-for="link in links"
        :key="link.label"
        v-bind="link"
        color="neutral"
        variant="link"
        class="px-0"
      />
    </nav>
  </header>
</template>
