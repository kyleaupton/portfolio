<template>
  <div class="page flex flex-col items-center gap-16 mx-auto max-w-screen-xl">
    <LandingHero />
    <LandingTechnologies />
    <LandingProjects />
  </div>

  <Toaster />
</template>

<script setup lang="ts">
definePageMeta({
  colorMode: "dark",
});

useSeoMeta({
  title: "Kyle Upton",
  description:
    "Full Stack Developer | Open-Source Contributor | TypeScript Enthusiast",
});

useHead({
  title: "Kyle Upton",
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon.svg",
    },
  ],
});
</script>

<style>
.page {
  padding: 0px 100px;
}

@media (max-width: 768px) {
  .page {
    padding: 0px 50px;
  }
}

@media (max-width: 480px) {
  .page {
    padding: 0px 20px;
  }
}
</style>
