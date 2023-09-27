<template>
  <div class="project-markdown" v-html="html"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js/lib/common';
import javascript from 'highlight.js/lib/languages/javascript';

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
            hljs.registerLanguage('javascript', javascript);
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
  padding: 0 calc(2rem + 16px);
  overflow: auto;
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
