<script setup lang="ts">
import type { ProjectSummary } from '~~/server/utils/github'

defineProps<{
  project: ProjectSummary
}>()
</script>

<template>
  <UPageCard
    :to="project.to"
    :title="project.name"
    :description="project.description || undefined"
    spotlight
    spotlight-color="primary"
    class="h-full"
  >
    <template #footer>
      <div class="flex w-full flex-col gap-3">
        <ProjectTech :tech="project.tech" />
        <div
          v-if="project.hasStats"
          class="flex items-center gap-4 text-sm text-muted"
        >
          <span
            v-if="project.stars"
            class="flex items-center gap-1.5"
          >
            <UIcon
              name="i-lucide-star"
              class="size-4"
            />
            {{ project.stars }}
          </span>
          <span
            v-if="project.pushedAt"
            class="flex items-center gap-1.5"
          >
            <UIcon
              name="i-lucide-history"
              class="size-4"
            />
            <NuxtTime
              :datetime="project.pushedAt"
              relative
              locale="en-US"
            />
          </span>
        </div>
      </div>
    </template>
  </UPageCard>
</template>
