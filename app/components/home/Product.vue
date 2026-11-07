<script setup lang="ts">
import type { ProjectSummary } from '~~/server/utils/github'

defineProps<{
  project: ProjectSummary
}>()
</script>

<template>
  <UPageCard
    :title="project.name"
    :description="project.description || undefined"
    orientation="horizontal"
    reverse
    highlight
    :ui="{ container: 'lg:grid-cols-[auto_1fr]' }"
  >
    <img
      src="/images/flashit-icon.png"
      :alt="`${project.name} app icon`"
      width="144"
      height="144"
      class="size-24 lg:size-36"
    >

    <template #footer>
      <div class="flex flex-col gap-4">
        <ProjectTech :tech="project.tech" />
        <div class="flex flex-wrap gap-2">
          <UButton
            :to="`${project.url}/releases/latest`"
            target="_blank"
            label="Download"
            icon="i-lucide-download"
          />
          <UButton
            :to="project.to"
            label="Learn more"
            color="neutral"
            variant="subtle"
            trailing-icon="i-lucide-arrow-right"
          />
        </div>
      </div>
    </template>
  </UPageCard>
</template>
