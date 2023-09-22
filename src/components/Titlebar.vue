<template>
  <div class="titlebar">
    <ClickableIcon
      v-tooltip="{ content: 'Copy Email', delay: 800 }"
      icon="envelope"
      @click="copyEmail"
    />

    <ClickableIcon
      v-tooltip="{ content: 'Open LinkedIn', delay: 800 }"
      icon="linkedin"
      @click="openLink('https://linkedin.com/in/kyle-upton-50bb1a188')"
    />

    <ClickableIcon
      v-tooltip="{ content: 'Open GitHub', delay: 800 }"
      icon="github"
      @click="openLink('https://github.com/kyleaupton')"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'pinia';
import { useToastsStore } from '../stores/toasts';
import ClickableIcon from './icons/ClickableIcon.vue';

export default defineComponent({
  name: 'Titlebar',

  components: {
    ClickableIcon,
  },

  methods: {
    ...mapActions(useToastsStore, ['showToast']),

    copyEmail() {
      navigator.clipboard.writeText('kyleaupton@gmail.com');
      this.showToast({ message: 'Email Copied to Clipboard' });
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
