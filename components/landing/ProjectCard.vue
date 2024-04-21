<template>
  <Drawer>
    <DrawerTrigger as-child>
      <Card
        class="flex flex-col justify-between text-start cursor-pointer bg-neutral-900 hover:bg-accent"
      >
        <CardHeader>
          <CardTitle>{{ repo.data.name }}</CardTitle>
          <CardDescription>{{ repo.data.description }}</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="flex justify-between items-center w-full flex-wrap gap-2">
            <div class="flex gap-2">
              <Badge v-for="badge of technologyBadges">{{ badge.name }}</Badge>
            </div>
            <div class="text-sm text-muted-foreground">{{ updated }}</div>
          </div>
        </CardContent>
      </Card>
    </DrawerTrigger>

    <DrawerContent>
      <VisuallyHidden>
        <!-- This is here for accessibility purposes -->
        <!-- Screen readers will read this out -->
        <DrawerTitle>Readme of {{ repo.data.name }}</DrawerTitle>
      </VisuallyHidden>
      <div class="project-markdown" v-html="renderedReadme" />
    </DrawerContent>
  </Drawer>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { VisuallyHidden } from "radix-vue";
import moment from "moment";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import technologies from "~/lib/technologies";

import { type Repo } from "./utils";

type TechBadge = {
  key: string;
  name: string;
  description: string;
  icon: string;
  color: string;
};

export default defineComponent({
  name: "ProjectCard",

  components: { VisuallyHidden },

  props: {
    repo: {
      type: Object as PropType<Repo>,
      required: true,
    },
  },

  data() {
    return {
      technologies,
    };
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

    technologyBadges(): TechBadge[] {
      const payload: TechBadge[] = [];
      const keys: string[] = this.repo.icons || [
        this.repo.data.language.toLowerCase(),
      ];

      for (const key of keys) {
        const tech = technologies.find((t) => t.key === key);
        if (tech) {
          payload.push(tech);
        }
      }

      return payload;
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
  font-size: 14px;
  cursor: text;
  @apply bg-neutral-800;
}

.project-markdown h1 {
  padding-bottom: 0.3em;
  font-size: 2em;
  @apply border-b;
}

.project-markdown h2 {
  padding-bottom: 0.3em;
  font-size: 1.5em;
  @apply border-b;
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

.project-markdown pre {
  margin-bottom: 16px;
}

.project-markdown code:not(.hljs) {
  padding: 0.2em 0.4em;
}

.project-markdown blockquote {
  padding: 0 1em;
  margin-inline-start: 0;
  margin-inline-end: 0;

  @apply border-l-4 text-neutral-400;
}

.project-markdown ul:has(li):has(input) {
  padding-inline-start: 0;
}

.project-markdown li:has(input) {
  list-style-type: none;
}
</style>
