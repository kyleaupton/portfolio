<script setup lang="ts">
useHead({
  htmlAttrs: { lang: 'en' },
  link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
})

const siteUrl = useRuntimeConfig().public.siteUrl
const route = useRoute()

useSeoMeta({
  titleTemplate: withSiteName,
  ogSiteName: SITE_NAME,
  ogType: 'website',
  ogUrl: () => `${siteUrl}${route.path}`,
  ogImage: `${siteUrl}/og.png`,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
