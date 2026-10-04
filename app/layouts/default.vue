<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const email = 'kyleaupton@gmail.com'

const route = useRoute()
const toast = useToast()

// Filter drafts even in dev so the nav matches production
const { data: publishedPosts } = await useAsyncData('has-writing', () =>
  queryCollection('writing').where('draft', '=', false).count(),
)

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Projects',
    to: '/projects',
    active: route.path.startsWith('/projects'),
  },
  ...(publishedPosts.value
    ? [{
        label: 'Writing',
        to: '/writing',
        active: route.path.startsWith('/writing'),
      }]
    : []),
  {
    label: 'Resume',
    to: '/resume',
    // Server route serving a PDF, so skip client-side routing
    external: true,
    target: '_blank',
  },
])

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(email)
    toast.add({ title: 'Email copied to clipboard', description: email, icon: 'i-lucide-check', color: 'success' })
  }
  catch {
    toast.add({ title: 'Could not copy email', description: email, icon: 'i-lucide-x', color: 'error' })
  }
}
</script>

<template>
  <div>
    <UHeader title="Kyle Upton">
      <UNavigationMenu :items="items" />

      <template #right>
        <UTooltip text="GitHub">
          <UButton
            icon="i-simple-icons-github"
            color="neutral"
            variant="ghost"
            to="https://github.com/kyleaupton"
            target="_blank"
            aria-label="GitHub"
          />
        </UTooltip>
        <UTooltip text="LinkedIn">
          <UButton
            icon="i-simple-icons-linkedin"
            color="neutral"
            variant="ghost"
            to="https://linkedin.com/in/kyle-upton-50bb1a188"
            target="_blank"
            aria-label="LinkedIn"
          />
        </UTooltip>
        <UTooltip text="Copy email">
          <UButton
            icon="i-lucide-mail"
            color="neutral"
            variant="ghost"
            aria-label="Copy email"
            @click="copyEmail"
          />
        </UTooltip>
        <UColorModeButton />
      </template>

      <template #body>
        <UNavigationMenu
          :items="items"
          orientation="vertical"
          class="-mx-2.5"
        />
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
