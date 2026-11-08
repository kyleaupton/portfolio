<script setup lang="ts">
const siteUrl = useRuntimeConfig().public.siteUrl
const route = useRoute()
// One URL per page, so /projects/ and /projects don't count as two pages
const canonical = computed(() => `${siteUrl}${route.path.replace(/\/+$/, '') || '/'}`)

useHead({
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'canonical', href: canonical },
  ],
})

useSeoMeta({
  titleTemplate: withSiteName,
  ogSiteName: SITE_NAME,
  ogType: 'website',
  ogUrl: canonical,
  ogImage: `${siteUrl}/og.png`,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator
      color="var(--ui-primary)"
      :height="2"
    />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
