<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

const route = useRoute()

// Filter drafts even in dev so the nav matches production
const { data: publishedPosts } = await useAsyncData('has-writing', () =>
  queryCollection('writing').where('draft', '=', false).count(),
)

const links = computed<ButtonProps[]>(() => [
  { label: 'Projects', to: '/projects', active: route.path.startsWith('/projects') },
  ...(publishedPosts.value ? [{ label: 'Writing', to: '/writing', active: route.path.startsWith('/writing') }] : []),
  // Server route serving a PDF, so skip client-side routing
  { label: 'Resume', to: '/resume', external: true, target: '_blank' },
])
</script>

<template>
  <div>
    <UHeader
      title="Kyle Upton"
      :toggle="false"
    >
      <template #right>
        <nav class="flex items-center gap-4 sm:gap-6">
          <UButton
            v-for="link in links"
            :key="link.label"
            v-bind="link"
            color="neutral"
            variant="link"
            active-color="primary"
            class="px-0"
          />
        </nav>
        <UColorModeButton class="ms-2" />
      </template>
    </UHeader>

    <UMain>
      <slot />
    </UMain>

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          © {{ new Date().getFullYear() }} Kyle Upton
        </p>
      </template>

      <template #right>
        <UButton
          label="Source"
          icon="i-simple-icons-github"
          color="neutral"
          variant="link"
          size="sm"
          to="https://github.com/kyleaupton/portfolio"
          target="_blank"
        />
      </template>
    </UFooter>
  </div>
</template>
