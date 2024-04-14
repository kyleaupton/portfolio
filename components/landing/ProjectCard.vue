<template>
  <Drawer>
    <DrawerTrigger as-child>
      <div
        class="cursor-pointer p-6 border rounded-lg shadow bg-gray-800 border-gray-700 hover:bg-gray-700 text-start flex flex-col gap-2"
      >
        <!-- First row -->
        <div class="flex justify-between">
          <p class="text-2xl font-bold text-white">
            {{ repo.data.name }}
          </p>

          <!-- Icons -->
          <div class="flex items-center justify-center gap-4">
            <Icon
              v-for="icon in languageIcons"
              class="h-6 w-6"
              :class="`language-icon-${icon}`"
              :key="icon"
              :icon="icon"
            />
          </div>
        </div>

        <!-- Second row -->
        <div>
          <p class="font-normal text-gray-400">{{ repo.data.description }}</p>
        </div>

        <!-- Third row -->
        <div class="flex justify-between text-gray-400">
          <div class="flex gap-6">
            <div v-for="stat of repoStatIcons" class="flex items-center gap-2">
              <fa-icon :icon="stat.icon" />
              <div>{{ stat.text }}</div>
            </div>
          </div>

          <div>{{ updated }}</div>
        </div>
      </div>
    </DrawerTrigger>

    <DrawerContent>
      <div class="project-markdown" v-html="renderedReadme"></div>
    </DrawerContent>
  </Drawer>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import moment from "moment";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

import { type Repo } from "./utils";

export default defineComponent({
  name: "ProjectCard",

  props: {
    repo: {
      type: Object as PropType<Repo>,
      required: true,
    },
  },

  computed: {
    renderedReadme() {
      const marked = new Marked(
        markedHighlight({
          langPrefix: "hljs language-",
          highlight: (code, lang) => {
            const language = hljs.getLanguage(lang) ? lang : "plaintext";
            return hljs.highlight(code, { language }).value;
          },
        })
      );

      return marked.parse(this.repo.readme);
    },

    languageIcons() {
      if (this.repo.icons) {
        return this.repo.icons;
      }

      if (this.repo.data.language) {
        return [this.repo.data.language.toLowerCase()];
      }

      return [];
    },

    repoStatIcons() {
      return [
        {
          icon: "fa-solid fa-clock-rotate-left",
          text: this.repo.commits,
        },
        {
          icon: "fa-solid fa-star",
          text: this.repo.data.stargazers_count,
        },
        {
          icon: "fa-regular fa-eye",
          text: this.repo.data.watchers,
        },
      ];
    },

    updated() {
      return moment(this.repo.data.pushed_at).fromNow();
    },
  },
});
</script>

<style>
/* Icon size overrides */
.language-icon-react,
.language-icon-electron {
  height: 28px;
  width: 28px;
}

.language-icon-c {
  height: 26px;
}

/* Readme */
.project-markdown {
  padding: 0 32px 32px 32px;
  overflow: auto;
}

.project-markdown img {
  max-width: 100%;
}

.project-markdown code {
  border-radius: 8px;
  background-color: rgb(24, 33, 47);
  font-size: 14px;
  cursor: text;
}

.project-markdown h1 {
  padding-bottom: 0.3em;
  font-size: 2em;
  border-bottom: 1px solid rgb(24, 33, 47);
}

.project-markdown h2 {
  padding-bottom: 0.3em;
  font-size: 1.5em;
  border-bottom: 1px solid rgb(24, 33, 47);
}

.project-markdown h1,
.project-markdown h2,
.project-markdown h3,
.project-markdown h4,
.project-markdown h5,
.project-markdown h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  line-height: 1.25;
  font-weight: 600;
}

.project-markdown p {
  margin-top: 0;
  margin-bottom: 16px;
}

.project-markdown li {
  margin-top: 4px;
}

.project-markdown ol {
  list-style: decimal;
  margin: 16px 0;
  padding-left: 2em;
}

.project-markdown ul {
  list-style: disc;
  margin: 16px 0;
  padding-left: 2em;
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

.project-markdown ul:has(li):has(input) {
  padding-inline-start: 0;
}

.project-markdown li:has(input) {
  list-style-type: none;
}
</style>
