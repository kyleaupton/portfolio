<script setup lang="ts">
import type { ProjectSummary } from '~~/server/utils/github'

const { data: projects } = await useFetch('/api/projects', { default: () => [] })

const toItem = (project: ProjectSummary) => ({
  key: project.slug,
  to: project.to,
  title: project.name,
  description: project.description,
  date: project.pushedAt ?? undefined,
})

const active = computed(() => projects.value.filter(project => project.tier !== 'archive').map(toItem))
const archived = computed(() => projects.value.filter(project => project.tier === 'archive').map(toItem))

useSeoMeta({
  title: 'Projects',
  description: 'Apps, libraries and experiments by Kyle Upton.',
})
</script>

<template>
  <div class="mx-auto flex max-w-4xl flex-col gap-14 px-6 py-12 sm:py-16">
    <header>
      <h1 class="text-3xl font-semibold tracking-tight text-highlighted">
        Projects
      </h1>
      <p class="mt-2 text-muted">
        Apps, libraries and experiments I've built, most of them open source.
      </p>
    </header>

    <LinkList :items="active" />

    <TitledSection
      v-if="archived.length"
      title="Archive"
    >
      <LinkList :items="archived" />
    </TitledSection>
  </div>
</template>
