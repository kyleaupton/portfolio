<template>
  <div class="projects">
    <p class="projects-title">Projects</p>

    <div class="projects-card">
      <Project
        v-for="project of projects"
        :key="project.id"
        class="projects-card-project"
        :project="project"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { t_project } from '../../types/project';
import Project from './Project.vue';

export default defineComponent({
  name: 'Projects',

  components: {
    Project,
  },

  data() {
    return {
      projects: [
        {
          id: 'kyleaupton/os-install-maker',
          icons: ['vue', 'electron', 'typescript'],
        },
        {
          id: 'kyleaupton/node-rsync',
          npm: 'https://www.npmjs.com/package/@kyleupton/node-rsync',
        },
        {
          id: 'kyleaupton/glob-copy',
          npm: 'https://www.npmjs.com/package/@kyleupton/glob-copy',
        },
        {
          id: 'kyleaupton/portfolio',
          icons: ['vue', 'typescript'],
        },
        {
          id: 'kyleaupton/TransactionTracker',
        },
        {
          id: 'kyleaupton/zerotier-utility',
          icons: ['vue', 'electron', 'javascript'],
        },
        {
          id: 'kyleaupton/witte-quote-generator-desktop',
          icons: ['vue', 'electron', 'javascript'],
        },
      ] as t_project[],
    };
  },
});
</script>

<style scoped>
.projects-title {
  font-size: 22px;
  font-weight: 600;
}

.projects-card {
  /* background-color: var(--surface-min-10); */
  border: 1px solid var(--surface-min-20);
  border-radius: 8px;
}

.projects-card-project:first-child {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.projects-card-project:last-child {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.projects-card-project:not(:last-child) {
  border-bottom: 1px solid var(--surface-min-20);
}
</style>
