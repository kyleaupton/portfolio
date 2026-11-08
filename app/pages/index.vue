<script setup lang="ts">
// The hero carries the name and links, so the site header would only repeat them
definePageMeta({ layout: false })

const { data: profile, error } = await useAsyncData('profile', async () => {
  const profile = await queryCollection('profile').first()
  if (!profile) throw createError({ statusCode: 500, statusMessage: 'Profile data missing' })
  return profile
})

throwIfFailed(error.value)

const { data: projects } = await useFetch('/api/projects', {
  query: { featured: true },
  default: () => [],
})

const { data: posts } = await useAsyncData('home-writing', () => {
  const query = queryCollection('writing')
    .select('path', 'title', 'description', 'date')
    .order('date', 'DESC')
    .limit(3)

  return import.meta.dev ? query.all() : query.where('draft', '=', false).all()
})

const careerItems = computed(() => profile.value?.career.map((role, index) => ({
  value: index,
  date: `${role.start} – ${role.end ?? 'Present'}`,
  title: role.title,
  description: role.company,
})) ?? [])

const projectItems = computed(() => projects.value.map(project => ({
  key: project.slug,
  to: project.to,
  title: project.name,
  description: project.description,
  date: project.pushedAt ?? undefined,
})))

const postItems = computed(() => (posts.value ?? []).map(post => ({
  key: post.path,
  to: post.path,
  title: post.title,
  description: post.description,
  date: post.date,
})))

usePageSeo({
  title: () => profile.value?.name,
  description: () => profile.value && `${profile.value.title}. ${profile.value.focus}.`,
})
</script>

<template>
  <div class="relative min-h-screen">
    <UColorModeButton class="absolute top-4 right-4" />

    <main
      v-if="profile"
      class="mx-auto flex max-w-4xl flex-col gap-14 px-6 py-16 sm:py-20"
    >
      <HomeHero :profile="profile" />

      <div class="grid gap-12 md:grid-cols-2 md:gap-16">
        <TitledSection title="Career">
          <UTimeline
            :items="careerItems"
            :default-value="0"
            color="primary"
            size="3xs"
            :ui="{ date: 'font-mono', title: 'text-base', description: 'text-sm' }"
          />
        </TitledSection>

        <TitledSection title="Tech">
          <dl class="grid grid-cols-[6rem_1fr] gap-x-4 gap-y-3">
            <template
              v-for="group in profile.tech"
              :key="group.label"
            >
              <dt class="text-sm text-muted">
                {{ group.label }}
              </dt>
              <dd class="text-highlighted">
                {{ group.items.join(', ') }}
              </dd>
            </template>
          </dl>
        </TitledSection>
      </div>

      <TitledSection
        v-if="projectItems.length"
        title="Projects"
      >
        <LinkList :items="projectItems" />
        <UButton
          to="/projects"
          label="All projects"
          trailing-icon="i-lucide-arrow-right"
          color="neutral"
          variant="link"
          class="mt-3 px-0"
        />
      </TitledSection>

      <TitledSection
        v-if="postItems.length"
        title="Writing"
      >
        <LinkList :items="postItems" />
        <UButton
          to="/writing"
          label="All writing"
          trailing-icon="i-lucide-arrow-right"
          color="neutral"
          variant="link"
          class="mt-3 px-0"
        />
      </TitledSection>
    </main>
  </div>
</template>
