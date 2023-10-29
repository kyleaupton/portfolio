<template>
  <div class="project-header" @click.self="handleExpanded">
    <!-- <Icon class="project-header-chevron" icon="chevron" /> -->

    <!-- Title -->
    <div class="project-header-title-wrapper" @click="handleExpanded">
      <div class="project-header-title-container">
        <!-- Name -->
        <div class="project-header-title">{{ name }}</div>

        <!-- Language Icons -->
        <div class="project-header-language-wrapper">
          <Icon
            v-for="icon of icons"
            :key="icon"
            class="project-language"
            :class="`project-language-${icon}`"
            :icon="icon"
          />
        </div>
      </div>

      <div class="project-header-title-description">
        {{ project.data.description }}
      </div>

      <div class="project-header-title-extra-container">
        <div class="project-header-title-extra-wrapper">
          <div
            class="project-header-title-extra-item project-header-title-extra-small"
          >
            <fa-icon :icon="['fas', 'clock-rotate-left']" />
            <div>{{ commits }}</div>
          </div>

          <div
            class="project-header-title-extra-item project-header-title-extra-small"
          >
            <fa-icon :icon="['far', 'star']" />
            <div>{{ stars }}</div>
          </div>

          <div class="project-header-title-extra-item">
            <fa-icon :icon="['far', 'eye']" />
            <div>{{ stars }}</div>
          </div>
        </div>

        <div
          class="project-header-title-extra-item project-header-title-extra-updated"
        >
          <div>{{ updatedText }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import moment from 'moment';
import { t_project } from '@/stores/github';
import Icon from '@/components/icons/Icon.vue';

export default defineComponent({
  name: 'ProjectHeader',

  components: {
    Icon,
  },

  props: {
    project: {
      type: Object as PropType<t_project>,
      required: true,
    },
  },

  emits: ['toggleExpanded'],

  computed: {
    icons() {
      return this.project.icons || [this.project.data.language.toLowerCase()];
    },

    name() {
      return this.project.data.name;
    },

    commits() {
      return this.project.data.commits;
    },

    stars() {
      return this.project.data.stargazers_count;
    },

    watchers() {
      return this.project.data.watchers_count;
    },

    updatedText() {
      return `${moment(this.project.data.pushed_at).fromNow()}`;
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
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex-grow: 2;
}

.project-header-title-container {
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
  font-size: 22px;
  font-weight: 600;
}

.project-language-electron {
  height: 28px;
  width: 28px;
}

.project-language-react {
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

.project-header-title-extra-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.project-header-title-extra-item {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--text2);
  font-size: 14px;
}

.project-header-title-extra-small {
  flex-basis: 60px;
  min-width: 60px;
}

.project-header-title-extra-container {
  display: flex;
  justify-content: space-between;
  gap: 24px;
}

.project-header-title-extra-updated {
  text-align: right;
}

.project-header-title-description {
  color: var(--text2);
  font-size: 14px;
}
</style>
