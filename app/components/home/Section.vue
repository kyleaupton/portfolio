<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <section>
    <h2 class="mb-4 text-sm font-medium text-muted">
      {{ title }}
    </h2>
    <slot />
  </section>
</template>
