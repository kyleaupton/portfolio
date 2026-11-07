<script setup lang="ts">
defineProps<{
  title: string
  to?: string
  linkLabel?: string
}>()
</script>

<template>
  <UPageSection :ui="{ container: 'gap-6 py-8 sm:gap-6 sm:py-10 lg:py-10' }">
    <template #header>
      <div class="flex items-center justify-between gap-4">
        <h2 class="text-xl font-semibold tracking-tight text-highlighted">
          {{ title }}
        </h2>
        <UButton
          v-if="to"
          :to="to"
          :label="linkLabel"
          trailing-icon="i-lucide-arrow-right"
          color="neutral"
          variant="link"
          size="sm"
        />
      </div>
    </template>

    <slot />
  </UPageSection>
</template>
