<template>
  <div class="flex flex-col gap-16 max-w-5xl my-0 mx-auto p-3 text-center">
    <LandingAnimation />
    <div class="text-lg font-medium">
      Full Stack Dev | Open-Source Contributer | TypeScript Enthusiast
    </div>
    <LandingTechnologies />
    <LandingProjects />
  </div>
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
