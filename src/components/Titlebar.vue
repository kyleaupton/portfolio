<template>
  <div class="titlebar">
    <ClickableIcon
      v-tooltip="{ content: 'Copy Email', delay: 500 }"
      style="height: 2em; width: 2em"
      @click="copyEmail"
    >
      <fa-icon
        :icon="['fas', 'envelope']"
        size="xl"
        style="color: var(--surface-0)"
      />
    </ClickableIcon>

    <ClickableIcon
      v-tooltip="{ content: 'Open LinkedIn', delay: 500 }"
      style="height: 2em; width: 2em"
      link="https://linkedin.com/in/kyle-upton-50bb1a188"
    >
      <fa-icon
        :icon="['fab', 'linkedin']"
        size="xl"
        style="color: var(--surface-0)"
      />
    </ClickableIcon>

    <ClickableIcon
      v-tooltip="{ content: 'Open GitHub', delay: 500 }"
      style="height: 2em; width: 2em"
      link="https://github.com/kyleaupton"
    >
      <fa-icon
        :icon="['fab', 'github']"
        size="xl"
        style="color: var(--surface-0)"
      />
    </ClickableIcon>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'pinia';

import { useToastsStore } from '@/stores/toasts';

import ClickableIcon from '@/components/icons/ClickableIcon.vue';

export default defineComponent({
  name: 'Titlebar',

  components: {
    ClickableIcon,
  },

  methods: {
    ...mapActions(useToastsStore, ['showToast']),

    async copyEmail() {
      try {
        await navigator.clipboard.writeText('kyleaupton@gmail.com');
        this.showToast({ message: 'Email Copied to Clipboard' });
      } catch (e) {
        this.showToast({ message: 'Failed to Copy Email', type: 'error' });
      }
    },

    openLink(link: string) {
      window.open(link);
    },
  },
});
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
