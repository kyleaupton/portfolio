<script setup lang="ts">
const props = withDefaults(defineProps<{ label?: string }>(), {
  label: 'Clicks',
})

const count = ref(0)
</script>

<template>
  <div class="my-6 flex items-center gap-3 rounded-lg border border-default bg-elevated/50 p-4">
    <UButton
      icon="i-lucide-plus"
      color="neutral"
      variant="outline"
      :aria-label="`Increment ${props.label}`"
      @click="count++"
    />
    <span class="text-sm text-muted">
      {{ props.label }}: <span class="font-medium text-highlighted tabular-nums">{{ count }}</span>
    </span>
  </div>
</template>
