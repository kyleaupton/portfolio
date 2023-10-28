<template>
  <div class="project-markdown" v-html="html"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

export default defineComponent({
  name: 'ProjectReadMe',

  props: {
    markdown: {
      type: String,
      required: true,
    },
  },

  computed: {
    html() {
      const marked = new Marked(
        markedHighlight({
          langPrefix: 'hljs language-',
          highlight(code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
          },
        }),
      );

      return marked.parse(this.markdown);
    },
  },
});
</script>

<style scoped>
.project-markdown {
  padding: 0 32px 32px 32px;
  overflow: auto;
}
</style>

<style>
.project-markdown img {
  max-width: 100%;
}

.project-markdown code {
  border-radius: 8px;
  background-color: var(--surface-min-10);
  font-size: 14px;
  cursor: text;
}

.project-markdown h1 {
  padding-bottom: 0.3em;
  font-size: 2em;
  border-bottom: 1px solid var(--surface-min-20);
}

.project-markdown h2 {
  padding-bottom: 0.3em;
  font-size: 1.5em;
  border-bottom: 1px solid var(--surface-min-20);
}

.project-markdown code:not(.hljs) {
  padding: 0.2em 0.4em;
}

.project-markdown blockquote {
  padding: 0 1em;
  border-left: 0.25em solid var(--surface-min-60);
  color: var(--surface-min-60);
  margin-inline-start: 0;
  margin-inline-end: 0;
}

.project-markdown ul {
  padding-inline-start: 0;
}
.project-markdown li:has(input)::marker {
  content: '';
}
</style>
