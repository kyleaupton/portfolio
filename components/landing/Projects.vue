<template>
  <div class="flex gap-4 flex-col w-full items-center mb-4">
    <p class="text-2xl font-medium py-6">Projects</p>

    <div class="mt-2" v-if="loading">
      <Spinner />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full" v-else>
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
