<script setup lang="ts">
const { data: projects } = await useFetch('/api/projects', { default: () => [] })

const active = computed(() => projects.value.filter(project => project.tier !== 'archive'))
const archived = computed(() => projects.value.filter(project => project.tier === 'archive'))

useSeoMeta({
  title: 'Projects',
  description: 'Apps, libraries and experiments by Kyle Upton.',
})
</script>

<template>
  <UContainer>
    <UPageHeader
      title="Projects"
      description="Apps, libraries and experiments I've built, most of them open source."
    />

    <UPageBody>
      <UPageGrid>
        <ProjectCard
          v-for="project in active"
          :key="project.slug"
          :project="project"
        />
      </UPageGrid>

      <section
        v-if="archived.length"
        class="mt-16"
      >
        <h2 class="text-lg font-semibold text-highlighted">
          Archive
        </h2>
        <p class="mt-1 text-sm text-muted">
          Older projects that are no longer maintained.
        </p>

        <UPageList
          divide
          class="mt-4 border-y border-default"
        >
          <NuxtLink
            v-for="project in archived"
            :key="project.slug"
            :to="project.to"
            class="group flex items-center gap-4 py-3 transition-colors"
          >
            <div class="min-w-0 flex-1">
              <p class="font-medium text-highlighted group-hover:text-primary">
                {{ project.name }}
              </p>
              <p
                v-if="project.description"
                class="truncate text-sm text-muted"
              >
                {{ project.description }}
              </p>
            </div>
            <NuxtTime
              v-if="project.pushedAt"
              :datetime="project.pushedAt"
              year="numeric"
              locale="en-US"
              class="shrink-0 text-sm text-dimmed tabular-nums"
            />
            <UIcon
              name="i-lucide-arrow-right"
              class="size-4 shrink-0 text-dimmed transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
            />
          </NuxtLink>
        </UPageList>
      </section>
    </UPageBody>
  </UContainer>
</template>
