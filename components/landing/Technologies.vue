<template>
  <div class="technologies">
    <p class="technology-title text-2xl font-medium">Technologies</p>

    <p class="technologies-divider">|</p>

    <template v-for="tech in techs" :key="tech.key">
      <div
        class="p-3 bg-slate-800 box-content rounded-full grid place-content-center w-6 h-6 cursor-pointer hover:bg-slate-700 active:bg-slate-600 hover:rounded-lg"
      >
        <Icon :class="`language-icon-${tech.key}`" :icon="tech.key" />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Technologies",

  data() {
    return {
      techs: [
        {
          key: "javascript",
          tooltip: "JavaScript",
        },
        {
          key: "typescript",
          tooltip: "TypeScript",
        },
        {
          key: "vue",
          tooltip: "Vue",
        },
        {
          key: "node",
          tooltip: "Node.js",
        },
        {
          key: "electron",
          tooltip: "Electron.js",
        },
        {
          key: "python",
          tooltip: "Python",
        },
      ],
    };
  },
});
</script>

<style scoped>
.technologies {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

@media only screen and (max-width: 674px) {
  .technologies {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    place-items: center;
    gap: 1rem;
  }

  .technology-title {
    grid-column-start: 1;
    grid-column-end: 4;
  }

  .technologies-divider {
    display: none;
  }
}
</style>
