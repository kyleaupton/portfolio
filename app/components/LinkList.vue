<script setup lang="ts">
defineProps<{
  items: { key: string, to: string, title: string, description?: string, date?: string | Date }[]
}>()
</script>

<template>
  <ul class="divide-y divide-default">
    <li
      v-for="item in items"
      :key="item.key"
    >
      <NuxtLink
        :to="item.to"
        class="group flex items-baseline gap-4 py-3"
      >
        <div class="min-w-0 flex-1 sm:flex sm:items-baseline sm:gap-4">
          <p class="font-medium text-highlighted transition-colors group-hover:text-primary sm:w-44 sm:shrink-0">
            {{ item.title }}
          </p>
          <p
            v-if="item.description"
            class="text-sm text-muted"
          >
            {{ item.description }}
          </p>
        </div>
        <NuxtTime
          v-if="item.date"
          :datetime="item.date"
          month="short"
          year="numeric"
          time-zone="UTC"
          locale="en-US"
          class="shrink-0 font-mono text-xs text-dimmed"
        />
      </NuxtLink>
    </li>
  </ul>
</template>
