<script setup lang="ts">
const props = withDefaults(defineProps<{
  tech: string[]
  size?: 'sm' | 'md'
}>(), {
  size: 'sm',
})

const TECH: Record<string, { label: string, icon: string }> = {
  'go': { label: 'Go', icon: 'i-simple-icons-go' },
  'vue': { label: 'Vue', icon: 'i-simple-icons-vuedotjs' },
  'nuxt': { label: 'Nuxt', icon: 'i-simple-icons-nuxt' },
  'react': { label: 'React', icon: 'i-simple-icons-react' },
  'typescript': { label: 'TypeScript', icon: 'i-simple-icons-typescript' },
  'javascript': { label: 'JavaScript', icon: 'i-simple-icons-javascript' },
  'node': { label: 'Node.js', icon: 'i-simple-icons-nodedotjs' },
  'electron': { label: 'Electron', icon: 'i-simple-icons-electron' },
  'postgresql': { label: 'PostgreSQL', icon: 'i-simple-icons-postgresql' },
  'c': { label: 'C', icon: 'i-simple-icons-c' },
  'obj-c': { label: 'Objective-C', icon: 'i-simple-icons-apple' },
  'discord': { label: 'Discord', icon: 'i-simple-icons-discord' },
}

const items = computed(() => props.tech.map(key => ({ key, ...(TECH[key] ?? { label: key, icon: 'i-lucide-code' }) })))
</script>

<template>
  <ul
    v-if="items.length"
    class="flex flex-wrap gap-1.5"
  >
    <li
      v-for="item in items"
      :key="item.key"
    >
      <UBadge
        :label="item.label"
        :icon="item.icon"
        color="neutral"
        variant="subtle"
        :size="size"
      />
    </li>
  </ul>
</template>
