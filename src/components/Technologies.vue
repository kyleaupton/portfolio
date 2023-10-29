<template>
  <div class="technologies">
    <p class="technology-title">Technologies</p>

    <p class="technologies-divider">|</p>

    <template v-for="tech in techs" :key="tech.key">
      <div class="technology">
        <img
          class="technology-image"
          :class="`technology-image-${tech.key}`"
          :src="tech.icon"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import javascript from '@/assets/javascript.png';
import typescript from '@/assets/typescript.png';
import vue from '@/assets/vue.png';
import node from '@/assets/node.png';
import electron from '@/assets/electron.png';
import python from '@/assets/python.png';

export default defineComponent({
  name: 'Technologies',

  data() {
    return {
      techs: [
        {
          key: 'js',
          icon: javascript,
          tooltip: 'JavaScript',
        },
        {
          key: 'ts',
          icon: typescript,
          tooltip: 'TypeScript',
        },
        {
          key: 'vue',
          icon: vue,
          tooltip: 'Vue',
        },
        {
          key: 'node',
          icon: node,
          tooltip: 'Node.js',
        },
        {
          key: 'electron',
          icon: electron,
          tooltip: 'Electron.js',
        },
        {
          key: 'python',
          icon: python,
          tooltip: 'Python',
        },
      ],
    };
  },
});
</script>

<style scoped>
.technologies {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.technology-title {
  font-size: 22px;
  font-weight: 600;
}

.technology {
  padding: 4px;
  background: var(--surface-min-20);
  border-radius: 100%;
  display: grid;
  place-content: center;
  height: 2.5em;
  width: 2.5em;
  cursor: pointer;
  transition: 0.2s border-radius;
}

.technology:hover {
  border-radius: 16px;
}

.technology img {
  height: 28px;
}

.technology-image-vue {
  height: 22px !important;
}

@media only screen and (max-width: 674px) {
  .technologies {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    place-items: center;
    gap: 1rem;
  }

  .technology-title {
    grid-column-start: 1;
    grid-column-end: 4;
  }

  .technologies-divider {
    display: none;
  }
}
</style>
