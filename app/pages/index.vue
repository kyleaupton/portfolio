<script setup lang="ts">
useSeoMeta({
  title: 'Kyle Upton',
  description: 'Senior Software Engineer building full stack TypeScript applications.',
})
</script>

<template>
  <UContainer class="py-16 sm:py-24 lg:py-32">
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
