<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

const route = useRoute()
const slug = computed(() => String(route.params.slug))

const { data: project } = await useFetch(() => `/api/projects/${slug.value}`)

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}

const links = computed(() => {
  const p = project.value
  if (!p) return []
  const items: ButtonProps[] = [
    { label: 'GitHub', icon: 'i-simple-icons-github', to: p.url, target: '_blank' },
  ]
  if (p.npm) items.push({ label: 'npm', icon: 'i-simple-icons-npm', to: p.npm, target: '_blank' })
  if (p.homepage) items.push({ label: 'Website', icon: 'i-lucide-arrow-up-right', to: p.homepage, target: '_blank' })
  return items
})

const stats = computed(() => {
  const p = project.value
  if (!p?.hasStats) return []
  return [
    { label: 'Stars', icon: 'i-lucide-star', value: p.stars?.toLocaleString('en-US') },
    { label: 'Commits', icon: 'i-lucide-git-commit-horizontal', value: p.commits?.toLocaleString('en-US') },
    { label: 'Language', icon: 'i-lucide-code', value: p.language },
    { label: 'License', icon: 'i-lucide-scale', value: p.license },
  ].filter(stat => stat.value != null)
})

useSeoMeta({
  title: () => project.value?.name,
  description: () => project.value?.description,
})
</script>

<template>
  <UContainer v-if="project">
    <UPageHeader
      :title="project.name"
      :description="project.description || undefined"
      :links="links"
    >
      <template #headline>
        <UButton
          to="/projects"
          label="Projects"
          icon="i-lucide-arrow-left"
          color="neutral"
          variant="link"
          size="sm"
          class="px-0"
        />
        <UBadge
          v-if="project.tier === 'archive'"
          label="Archived"
          icon="i-lucide-archive"
          color="neutral"
          variant="subtle"
          size="sm"
          class="ms-2"
        />
      </template>
    </UPageHeader>

    <UPage>
      <UPageBody>
        <MDCRenderer
          v-if="project.readme"
          :body="project.readme.body"
          :data="project.readme.data"
          class="min-w-0"
        />
        <UEmpty
          v-else
          icon="i-lucide-file-text"
          title="README unavailable"
          description="The README for this project couldn't be loaded right now."
          :actions="[{ label: 'View on GitHub', icon: 'i-simple-icons-github', to: project.url, target: '_blank', color: 'neutral', variant: 'subtle' }]"
        />
      </UPageBody>

      <template #right>
        <aside class="space-y-6 py-8 lg:sticky lg:top-(--ui-header-height) lg:max-h-[calc(100vh-var(--ui-header-height))]">
          <dl
            v-if="stats.length || project.pushedAt"
            class="space-y-3 text-sm"
          >
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="flex items-center justify-between gap-4"
            >
              <dt class="flex items-center gap-2 text-muted">
                <UIcon
                  :name="stat.icon"
                  class="size-4"
                />
                {{ stat.label }}
              </dt>
              <dd class="font-medium text-highlighted tabular-nums">
                {{ stat.value }}
              </dd>
            </div>
            <div
              v-if="project.pushedAt"
              class="flex items-center justify-between gap-4"
            >
              <dt class="flex items-center gap-2 text-muted">
                <UIcon
                  name="i-lucide-history"
                  class="size-4"
                />
                Last push
              </dt>
              <dd class="font-medium text-highlighted">
                <NuxtTime
                  :datetime="project.pushedAt"
                  month="short"
                  year="numeric"
                  locale="en-US"
                />
              </dd>
            </div>
          </dl>

          <USeparator v-if="(stats.length || project.pushedAt) && project.tech.length" />

          <div v-if="project.tech.length">
            <p class="mb-3 text-sm text-muted">
              Built with
            </p>
            <ProjectTech :tech="project.tech" />
          </div>
        </aside>
      </template>
    </UPage>
  </UContainer>
</template>
