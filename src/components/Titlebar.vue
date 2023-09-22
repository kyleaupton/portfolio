<template>
  <div class="titlebar">
    <ClickableIcon icon="linkedin" @click="openLink('https://linkedin.com/in/kyle-upton-50bb1a188')" />
    <ClickableIcon icon="github" @click="openLink('https://github.com/kyleaupton')" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ClickableIcon from './icons/ClickableIcon.vue'

  export default defineComponent({
    name: 'Titlebar',

    components: {
      ClickableIcon
    },

    methods: {
      openLink(link: string) {
        window.open(link)
      }
    }
  })
</script>

<style scoped>
.titlebar {
  display: flex;
  justify-content: end;
  gap: 12px;
  height: 48px;
  padding: 24px;
}
</style>