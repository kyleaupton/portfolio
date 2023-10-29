<template>
  <Titlebar />

  <div class="content">
    <LandingAnimation />

    <div class="text-1">
      Full Stack Dev | Open-Source Contributer | TypeScript Enthusiast
    </div>

    <div class="tech-wrapper">
      <Technologies />
    </div>

    <div class="projects-wrapper">
      <Projects />
    </div>
  </div>

  <Modal />
  <Toasts />
  <Transition name="fade">
    <div v-if="item" class="app-dimmer" @click.self="handleDimmerClick" />
  </Transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'pinia';

import { useModalStore } from '@/stores/modal';

import Titlebar from '@/components/Titlebar.vue';
import LandingAnimation from '@/components/LandingAnimation.vue';
import Technologies from '@/components/Technologies.vue';
import Projects from '@/components/projects/Projects.vue';
import Toasts from '@/components/toasts/Toasts.vue';
import Modal from '@/components/modals/Modal.vue';

export default defineComponent({
  name: 'App',

  components: {
    Titlebar,
    LandingAnimation,
    Technologies,
    Projects,
    Toasts,
    Modal,
  },

  computed: {
    ...mapState(useModalStore, ['item']),
  },

  methods: {
    ...mapActions(useModalStore, ['closeModal']),

    handleDimmerClick() {
      if (this.item) {
        this.closeModal();
      }
    },
  },
});
</script>

<style scoped></style>

<style>
:root {
  --surface-min-80: #d3d3d3;
  --surface-min-70: #bdbdbd;
  --surface-min-60: #a7a7a7;
  --surface-min-50: #929292;
  --surface-min-40: #7c7c7c;
  --surface-min-30: #666666;
  --surface-min-20: #505050;
  --surface-min-10: #3a3a3a;
  --surface-0: #242424;
  --surface-plus-10: #202020;
  --surface-plus-20: #1d1d1d;
  --surface-plus-30: #191919;
  --surface-plus-40: #161616;
  --surface-plus-50: #121212;
  --surface-plus-60: #0e0e0e;
  --surface-plus-70: #0b0b0b;
  --surface-plus-80: #070707;

  --text1: rgba(255, 255, 255, 0.87);
  --text2: rgba(255, 255, 255, 0.5);

  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: var(--text1);
  background-color: var(--surface-0);

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}

a:hover {
  color: #535bf2;
}

body {
  margin: 0;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}

button:hover {
  border-color: #646cff;
}

button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  max-width: 1000px;
  margin: 0 auto;
  padding: 12px;
  text-align: center;
}

.card {
  padding: 2em;
}

.text-1 {
  font-weight: 500;
}

.tech-wrapper {
  width: 100%;
  overflow: auto;
}

.app-dimmer {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.75);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
