<template>
  <div
    class="project"
    :class="[{ 'project-expanded': expanded }]"
    @click.self="handleExpand"
  >
    <ProjectHeader :project="project" @toggle-expanded="handleExpand" />

    <!-- NOT USED ANYMORE -->
    <div v-if="expanded" class="project-extended-wrap">
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
        <a :href="project.data.html_url" target="_blank">
          <ClickableIcon
            v-tooltip="{ content: 'View on GitHub', delay: 800 }"
            class="project-expanded-icon project-expanded-icon-github"
            icon="github"
          />
        </a>
      </div>

      <template v-if="project.data.readme">
        <ProjectReadMe
          class="project-expanded-markdown"
          :repository="project.data"
          :markdown="project.data.readme"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { mapState, mapActions } from 'pinia';

import { useGitHubStore, t_project } from '@/stores/github';
import { useModalStore } from '@/stores/modal';
import { t_modal_titlebar_icon } from '@/types/modal';

import ClickableIcon from '@/components/icons/ClickableIcon.vue';
import ProjectHeader from './ProjectHeader.vue';
import ProjectReadMe from './ProjectReadMe.vue';

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
      expanded: false,
    };
  },

  computed: {
    ...mapState(useGitHubStore, ['repos']),

    id() {
      return `project-markdown-${this.project}`;
    },
  },

  methods: {
    ...mapActions(useModalStore, ['openModal']),

    goToLink() {
      window.open(this.project.data.html_url);
    },

    handleExpand() {
      const icons: t_modal_titlebar_icon[] = [
        {
          icon: ['fab', 'github'],
          tooltip: 'View on GitHub',
          link: this.project.data.html_url,
        },
      ];

      if (this.project.npm) {
        icons.push({
          icon: ['fab', 'npm'],
          tooltip: 'View on npm',
          link: this.project.npm,
        });
      }

      this.openModal({
        name: 'ModalReadMe',
        data: { project: this.project.data.full_name },
        titlebarIcons: icons,
      });
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
  background-color: var(--surface-min-10);
  border-radius: 8px;
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
