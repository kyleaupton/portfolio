<template>
  <Drawer>
    <DrawerTrigger as-child>
      <Card
        class="flex flex-col justify-between text-start cursor-pointer bg-neutral-900 hover:bg-accent"
      >
        <CardHeader>
          <CardTitle>{{ repo.display }}</CardTitle>
          <CardDescription>{{ repo.data.description }}</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="flex justify-between items-center w-full flex-wrap gap-2">
            <div class="flex gap-2">
              <Badge
                v-for="badge of technologyBadges"
                :key="badge.key"
              >
                {{ badge.name }}
              </Badge>
            </div>
            <div class="text-sm text-muted-foreground">
              {{ updated }}
            </div>
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
      <div
        class=" overflow-scroll"
      >
        <div
          v-if="readme"
          class="markdown-body"
          v-html="readme"
        />
        <div
          v-else
          class="flex justify-center items-center h-64"
        >
          <Spinner />
        </div>
      </div>
    </DrawerContent>
  </Drawer>
</template>

<script lang="ts">
import 'github-markdown-css/github-markdown-dark.css'
import { defineComponent, type PropType } from 'vue'
import { VisuallyHidden } from 'radix-vue'
import moment from 'moment'
import type { Repo } from './utils'
import marked from '~/lib/marked'
import technologies from '~/lib/technologies'

type TechBadge = {
  key: string
  name: string
  description: string
  icon: string
  color: string
}

type Data = {
  technologies: TechBadge[]
  readme: string | undefined
}

export default defineComponent({
  name: 'ProjectCard',

  components: { VisuallyHidden },

  props: {
    repo: {
      type: Object as PropType<Repo>,
      required: true,
    },
  },

  data(): Data {
    return {
      technologies,
      readme: undefined,
    }
  },

  computed: {
    technologyBadges(): TechBadge[] {
      const payload: TechBadge[] = []
      const keys: string[] = this.repo.technologies || [
        this.repo.data.language.toLowerCase(),
      ]

      for (const key of keys) {
        const tech = technologies.find(t => t.key === key)
        if (tech) {
          payload.push(tech)
        }
      }

      return payload
    },

    repoStatIcons() {
      return [
        {
          icon: 'fa-solid fa-clock-rotate-left',
          text: this.repo.commits,
        },
        {
          icon: 'fa-solid fa-star',
          text: this.repo.data.stargazers_count,
        },
        {
          icon: 'fa-regular fa-eye',
          text: this.repo.data.watchers,
        },
      ]
    },

    updated() {
      return moment(this.repo.data.pushed_at).fromNow()
    },
  },

  async mounted() {
    await this.generateReadme()
  },

  methods: {
    async generateReadme() {
      this.readme = await marked.parse(this.repo.readme)
    },
  },
})
</script>

<style>
.markdown-body {
  @apply p-8 bg-card;
}

.markdown-body img {
  @apply bg-card;
}

.markdown-body li:has(input) {
  margin: 0 .2em .25em -1.4em;
}

.markdown-body li:not(:has(input)) {
  @apply list-disc;
}

/* Override or add custom styles here if needed */
</style>
