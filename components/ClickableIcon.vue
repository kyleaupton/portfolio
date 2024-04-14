<template>
  <component
    :is="link ? 'a' : 'div'"
    :href="link"
    target="_blank"
    class="clickable-icon"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ClickableIcon",

  props: {
    link: {
      type: String,
      default: "",
    },
  },
});
</script>

<style scoped>
.clickable-icon {
  padding: 4px;
  background: var(--surface-min-20);
  border-radius: 100%;
  display: grid;
  place-content: center;
  height: 24px;
  width: 24px;
  cursor: pointer;
  transition: 0.2s border-radius;
}

.clickable-icon:hover {
  background-color: var(--surface-min-30);
  border-radius: 8px;
}

.clickable-icon:active {
  background-color: var(--surface-min-40);
}
</style>
