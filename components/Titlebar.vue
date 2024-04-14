<template>
  <div class="titlebar">
    <ClickableIcon class="titlebar-icon" link="https://kyleupton.info/resume">
      <fa-icon :icon="['fas', 'id-card']" size="xl" />
    </ClickableIcon>

    <ClickableIcon class="titlebar-icon" @click="copyEmail">
      <fa-icon :icon="['fas', 'envelope']" size="xl" />
    </ClickableIcon>

    <ClickableIcon
      class="titlebar-icon"
      link="https://linkedin.com/in/kyle-upton-50bb1a188"
    >
      <fa-icon :icon="['fab', 'linkedin']" size="xl" />
    </ClickableIcon>

    <ClickableIcon class="titlebar-icon" link="https://github.com/kyleaupton">
      <fa-icon :icon="['fab', 'github']" size="xl" />
    </ClickableIcon>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Titlebar",

  methods: {
    async copyEmail() {
      console.log("copying email");
      try {
        await navigator.clipboard.writeText("kyleaupton@gmail.com");
        // this.showToast({ message: "Email Copied to Clipboard" });
      } catch (e) {
        // this.showToast({ message: "Failed to Copy Email", type: "error" });
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
  margin-bottom: 2rem;
}

.titlebar-icon {
  height: 3em;
  width: 3em;
}

.titlebar-icon svg {
  color: var(--surface-0);
}
</style>
