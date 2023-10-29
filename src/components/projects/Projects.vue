<template>
  <div class="projects-wrapper">
    <p class="projects-title">Projects</p>

    <div v-if="loading">
      <Spinner />
    </div>

    <div v-else class="projects">
      <Project
        v-for="repo of sortedProjects"
        :key="repo.data.id"
        class="projects-card-project"
        :project="repo"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'pinia';
import { useGitHubStore } from '@/stores/github';
import Project from './Project.vue';
import Spinner from '../Spinner.vue';

export default defineComponent({
  name: 'Projects',

  components: {
    Project,
    Spinner,
  },

  data() {
    return {
      loading: true,
    };
  },

  computed: {
    ...mapState(useGitHubStore, ['repos', 'allLoaded']),

    sortedProjects() {
      const arr = Object.keys(this.repos).map((key) => this.repos[key]);
      return arr.sort((a, b) => {
        const aTime = new Date(a.data.pushed_at);
        const bTime = new Date(b.data.pushed_at);

        return +bTime - +aTime;
      });
    },
  },

  async created() {
    await this.getRepos();
    this.loading = false;
  },

  methods: {
    ...mapActions(useGitHubStore, ['getRepos']),
  },
});
</script>

<style scoped>
.projects-title {
  font-size: 22px;
  font-weight: 600;
}

.projects {
  /* background-color: var(--surface-min-10); */
  /* border: 1px solid var(--surface-min-20); */
  /* border-radius: 8px; */
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* .projects-card-project:first-child {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.projects-card-project:last-child {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.projects-card-project:not(:last-child) {
  border-bottom: 1px solid var(--surface-min-20);
} */
</style>
