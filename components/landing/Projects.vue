<template>
  <div class="flex gap-4 flex-col items-center projects-wrapper">
    <p class="text-2xl font-medium py-6">Projects</p>

    <div class="mt-2" v-if="loading">
      <Spinner />
    </div>

    <div class="flex flex-col gap-2 w-full max-w-4xl" v-else>
      <LandingProjectCard
        v-for="repo in sortedRepos"
        :key="repo.data.id"
        :repo="repo"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getRepos, type Repos } from "./utils";

export default defineComponent({
  name: "Projects",

  data() {
    return {
      loading: true,
      repos: null as null | Repos,
    };
  },

  computed: {
    sortedRepos() {
      if (!this.repos) return [];

      return this.repos.sort((a, b) => {
        const aTime = new Date(a.data.pushed_at).getTime();
        const bTime = new Date(b.data.pushed_at).getTime();

        return +bTime - +aTime;
      });
    },
  },

  async mounted() {
    const data = await getRepos();
    this.repos = data;

    this.loading = false;
  },
});
</script>

<style scoped>
.projects-title {
  font-size: 22px;
  font-weight: 600;
  margin: 24px 0;
}

.projects {
  /* background-color: var(--surface-min-10); */
  /* border: 1px solid var(--surface-min-20); */
  /* border-radius: 8px; */
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
