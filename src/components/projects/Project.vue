<template>
  <div class="project" :class="[{ 'project-expanded': expanded }]" @click.self="expanded = !expanded">
    <template v-if="loading">
      <p>loading...</p>
    </template>
    <template v-else>
      <div class="project-header" @click.self="expanded = !expanded">
        <div class="project-header-title-wrapper" @click="expanded = !expanded">
          <Icon class="project-chevron" icon="chevron" />
          <Icon class="project-language" :icon="repository.language.toLowerCase()" />
          <p class="project-header-title">{{ repository.name }}</p>
        </div>

        <ClickableIcon icon="github" v-tooltip="{ content: 'View on GitHub', delay: 800 }" @click="goToLink" />
      </div>

      <div v-show="expanded" class="project-extra">
        <div class="project-markdown" v-html="markdown"></div>
      </div>
    </template>
  </div>
</template> 

<script lang=ts>
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'pinia';

import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js/lib/common'
import javascript from 'highlight.js/lib/languages/javascript';

import { useGitHubStore } from '../../stores/github';
import Icon from '../icons/Icon.vue';
import ClickableIcon from '../icons/ClickableIcon.vue';

  export default defineComponent({
    name: 'Project',

    props: {
      project: {
        type: String,
        required: true
      }
    },

    components: {
      Icon,
      ClickableIcon,
    },

    data() {
      return {
        loading: true,
        expanded: false,
      }
    },

    computed: {
      ...mapState(useGitHubStore, ['repos']),

      id() {
        return `project-markdown-${this.project}`;
      },

      repository() {
        return this.repos[this.project]
      },

      markdown() {
        const marked = new Marked(
          markedHighlight({
            langPrefix: 'hljs language-',
            highlight(code, lang) {
              const language = hljs.getLanguage(lang) ? lang : 'plaintext';
              hljs.registerLanguage('javascript', javascript);
              return hljs.highlight(code, { language }).value;
            }
          })
        );

        return this.repository ? marked.parse(this.repository.readme) : '';
      }
    },

    async created() {
      this.loading = true;
      await this.getRepo(this.project)
      this.loading = false
    },

    methods: {
      ...mapActions(useGitHubStore, ['getRepo']),

      goToLink() {
        window.open(this.repository?.html_url);
      }
    }
  })
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

.project:hover {
  background-color: var(--surface-min-30);
}

.project-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  cursor: pointer;
}

svg.project-chevron {
  fill: var(--text1);
  transform: rotate(90deg);
  transition: all 0.2s ease;
}

.project-expanded svg.project-chevron {
  transform: rotate(180deg);
}

.project-header-title-wrapper {
  display: flex;
  align-items: center;
  gap: 16px;
}

.project-language {
  height: 22px;
  width: 22px;
}

.project-header-title {
  font-size: 18px;
  font-weight: 600;
}

.project-markdown {
  padding: 1rem 2rem;
  background: var(--surface-plus-10);
  border-radius: 8px;
  overflow: auto;
}

.project-extra {
  cursor: default;
}
</style>

<style>
.project pre {
  background: var(--surface-min-20);
  border-radius: 4px;
  padding: 16px;
  min-width: fit-content;
}
</style>