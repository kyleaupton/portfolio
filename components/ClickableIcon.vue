<template>
  <component
    :is="link ? 'a' : 'div'"
    :href="link"
    target="_blank"
    class="clickable-icon p-1 bg-slate-800 rounded-full grid place-content-center w-6 h-6 cursor-pointer hover:bg-slate-700 active:bg-slate-600 hover:rounded-lg"
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
