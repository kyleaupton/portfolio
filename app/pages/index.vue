<script setup lang="ts">
const { data: featured } = await useFetch('/api/projects', {
  query: { featured: true },
  default: () => [],
})

const product = computed(() => featured.value.find(project => project.tier === 'product'))
const projects = computed(() => featured.value.filter(project => project.tier !== 'product'))

const { data: posts } = await useAsyncData('home-writing', () => {
  const query = queryCollection('writing')
    .select('path', 'title', 'description', 'date')
    .order('date', 'DESC')
    .limit(3)

  return import.meta.dev ? query.all() : query.where('draft', '=', false).all()
})

useSeoMeta({
  title: 'Kyle Upton',
  description: 'Senior Software Engineer building full stack TypeScript applications.',
})
</script>

<template>
  <div class="pb-8 sm:pb-12">
    <UContainer class="pt-16 pb-8 sm:pt-24 sm:pb-10 lg:pt-32">
      <div class="flex max-w-2xl flex-col gap-3">
        <p
          class="hero-enter text-muted"
          style="--delay: 100ms"
        >
          Hi, I'm
        </p>
        <h1
          class="hero-enter text-4xl font-semibold tracking-tight text-highlighted sm:text-6xl"
          style="--delay: 150ms"
        >
          Kyle Upton
        </h1>
        <p
          class="hero-enter text-lg text-toned"
          style="--delay: 300ms"
        >
          Senior Software Engineer
        </p>
        <p
          class="hero-enter mt-2 text-pretty text-muted"
          style="--delay: 450ms"
        >
          I'm a full stack engineer specializing in
          <span class="text-highlighted">TypeScript</span> and
          <span class="text-highlighted">JavaScript</span>. From crafting elegant
          frontend interfaces to architecting robust backend systems, my expertise
          spans the full spectrum of web development. Currently I'm working at
          <span class="text-highlighted">Red Oak Development</span> creating industry leading software.
        </p>
      </div>
    </UContainer>

    <HomeSection
      v-if="featured.length"
      title="Projects"
    >
      <div class="flex flex-col gap-6">
        <HomeProduct
          v-if="product"
          :project="product"
        />

        <UPageGrid>
          <ProjectCard
            v-for="project in projects"
            :key="project.slug"
            :project="project"
          />
          <UPageCard
            to="/projects"
            title="All projects"
            description="Libraries, experiments and the archive."
            icon="i-lucide-arrow-right"
            variant="subtle"
            class="h-full"
          />
        </UPageGrid>
      </div>
    </HomeSection>

    <HomeSection
      v-if="posts?.length"
      title="Latest writing"
      to="/writing"
      link-label="All writing"
    >
      <WritingList :posts="posts" />
    </HomeSection>
  </div>
</template>

<style scoped>
@media (prefers-reduced-motion: no-preference) {
  .hero-enter {
    animation: hero-enter 600ms cubic-bezier(0.16, 1, 0.3, 1) var(--delay, 0ms) both;
  }
}

@keyframes hero-enter {
  from {
    opacity: 0;
    transform: translateY(0.5rem);
  }
}
</style>
