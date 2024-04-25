<template>
  <div class="hero flex flex-col gap-2 w-full">
    <div
      class="text-neutral-400 -mb-2 animate-slidein [--slidein-delay:300ms] opacity-0"
    >
      Hi, I'm
    </div>
    <h1
      class="animate-slidein [--slidein-delay:300ms] opacity-0 text-4xl md:text-6xl -ml-[1px] md:-ml-[2px]"
    >
      Kyle Upton
    </h1>
    <h3 class="text-lg animate-slidein [--slidein-delay:500ms] opacity-0">
      Senior Software Developer
    </h3>
    <div class="max-w-xl animate-slidein [--slidein-delay:700ms] opacity-0">
      <div class="text-neutral-400">
        I'm a full stack engineer specializing in
        <span class="text-white">TypeScript</span> and
        <span class="text-white">JavaScript</span>. From crafting elegant
        frontend interfaces to achitecting robust backend systems, my expertise
        spans the full spectrum of web development. Currently I'm working at
        DigitalGlue on the creative.space platform.
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Hero",
});
</script>

<style scoped>
.heading {
  font-size: clamp(40px, 8vw, 80px);
  font-weight: 600;
}

.hero {
  margin: 5rem 0;
}

@media (max-width: 768px) {
  .hero {
    margin: 3rem 0;
  }
}

@media (max-width: 480px) {
  .hero {
    margin: 0;
  }
}
</style>
