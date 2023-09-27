<template>
  <div
    class="project"
    :class="[{ 'project-expanded': expanded }]"
    @click.self="expanded = !expanded"
  >
    <template v-if="loading">
      <p>loading...</p>
    </template>
    <template v-else>
      <ProjectHeader
        :repository="repository"
        :project="project"
        @toggle-expanded="expanded = !expanded"
      />

      <div v-show="expanded" class="project-extended-wrap">
        <div class="project-expanded-actions">
          <!-- NPM -->
          <a v-if="project.npm" :href="project.npm" target="_blank">
            <ClickableIcon
              v-tooltip="{ content: 'View on npm', delay: 800 }"
              class="project-expanded-icon project-expanded-icon-npm"
              icon="npm"
            />
          </a>

          <!-- GitHub -->
          <a :href="repository?.html_url" target="_blank">
            <ClickableIcon
              v-tooltip="{ content: 'View on GitHub', delay: 800 }"
              class="project-expanded-icon project-expanded-icon-github"
              icon="github"
            />
          </a>
        </div>

        <ProjectReadMe
          class="project-expanded-markdown"
          :repository="repository"
          :markdown="repository.readme"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { mapState, mapActions } from 'pinia';

import { t_project } from '../../types/project';
import { useGitHubStore } from '../../stores/github';

import ProjectHeader from './ProjectHeader.vue';
import ProjectReadMe from './ProjectReadMe.vue';
import ClickableIcon from '../icons/ClickableIcon.vue';

export default defineComponent({
  name: 'Project',

  components: {
    ProjectHeader,
    ProjectReadMe,
    ClickableIcon,
  },

  props: {
    project: {
      type: Object as PropType<t_project>,
      required: true,
    },
  },

  data() {
    return {
      loading: true,
      expanded: false,
    };
  },

  computed: {
    ...mapState(useGitHubStore, ['repos']),

    id() {
      return `project-markdown-${this.project}`;
    },

    repository() {
      return this.repos[this.project.id];
    },
  },

  async created() {
    this.loading = true;
    await this.getRepo(this.project.id);
    this.loading = false;
  },

  methods: {
    ...mapActions(useGitHubStore, ['getRepo']),

    goToLink() {
      window.open(this.repository?.html_url);
    },
  },
});
</script>

<style scoped>
.project {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  text-align: left;
  cursor: pointer;
}

.project-extended-wrap {
  margin: 0 -16px;
  padding: 16px;
  border-top: 1px solid var(--surface-min-20);
  cursor: default;
}

.project-expanded-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.project-expanded-icon {
  height: 2.5rem;
  width: 2.5rem;
}
</style>

<style>
.project-expanded-icon-npm svg {
  height: 32px !important;
  width: 32px !important;
}
</style>
