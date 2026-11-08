<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const notFound = computed(() => props.error.statusCode === 404)
const title = computed(() => notFound.value ? 'Page not found' : 'Something went wrong')

// error.vue replaces app.vue, so its head setup doesn't apply here
useHead({
  htmlAttrs: { lang: 'en' },
  link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
  title: () => withSiteName(title.value),
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <UError
        :error="{
          statusCode: error.statusCode,
          statusMessage: title,
          message: notFound ? 'There\'s nothing at this address.' : 'Try again in a moment.',
        }"
        :clear="{ label: 'Back to home', color: 'neutral', variant: 'subtle' }"
        as="div"
        :ui="{ root: 'min-h-0 py-16 sm:py-20' }"
      />
    </NuxtLayout>
  </UApp>
</template>
