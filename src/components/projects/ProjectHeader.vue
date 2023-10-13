<template>
  <div class="project-header" @click.self="handleExpanded">
    <Icon class="project-header-chevron" icon="chevron" />

    <!-- Title -->
    <div class="project-header-title-wrapper" @click="handleExpanded">
      <!-- Name -->
      <div class="project-header-title">{{ name }}</div>

      <!-- Language Icons -->
      <template v-if="repository">
        <div class="project-header-language-wrapper">
          <Icon
            v-for="icon of icons"
            :key="icon"
            class="project-language"
            :class="`project-language-${icon}`"
            :icon="icon"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Repo } from '../../stores/github';
import { t_project } from '../../types/project';

import Icon from '../icons/Icon.vue';

type prop_repo = Repo | undefined;

export default defineComponent({
  name: 'ProjectHeader',

  components: {
    Icon,
  },

  props: {
    repository: {
      type: Object as PropType<prop_repo>,
      default: undefined,
    },

    project: {
      type: Object as PropType<t_project>,
      required: true,
    },
  },

  emits: ['toggleExpanded'],

  computed: {
    icons() {
      return (
        this.project.icons || [
          this.repository ? this.repository.language.toLowerCase() : '',
        ]
      );
    },

    name() {
      return this.project.id.split('/')[1];
    },
  },

  methods: {
    handleExpanded() {
      this.$emit('toggleExpanded');
    },
  },
});
</script>

<style scoped>
.project-header {
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 16px;
  cursor: pointer;
}

svg.project-header-chevron {
  fill: var(--text1);
  transform: rotate(90deg);
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.project-expanded svg.project-header-chevron {
  transform: rotate(180deg);
}

.project-header-title-wrapper {
  flex-grow: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap-reverse;
}

.project-language {
  height: 22px;
  width: 22px;
}

.project-header-title {
  font-size: 18px;
  font-weight: 600;
}

.project-language-electron {
  height: 28px;
  width: 28px;
}

.project-header-language-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.project-github-icon {
  height: 2rem;
  width: 2rem;
}
</style>
