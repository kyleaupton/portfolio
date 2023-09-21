<template>
  <div class="technologies">
    <p class="technology-title">Technologies</p>

    <p class="technologies-divider">|</p>

    <template v-for="tech in techs" :key="tech.key">
      <ClickableIcon class="technology" :class="`technology-${tech.key}`" :icon="tech.icon" :clickable="false" />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ClickableIcon from './icons/ClickableIcon.vue';

  export default defineComponent({
    name: 'Technologies',

    components: {
      ClickableIcon,
    },

    data() {
      return {
        techs: [
          {
            key: 'js',
            icon: 'javascript'
          },
          {
            key: 'ts',
            icon: 'typescript'
          },
          {
            key: 'vue',
            icon: 'vue'
          },
          {
            key: 'node',
            icon: 'node'
          },
          {
            key: 'electron',
            icon: 'electron'
          },
          {
            key: 'python',
            icon: 'python'
          }
        ]
      }
    },
  })
</script>

<style>
.technologies {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.technology-title {
  font-weight: 600;
}

.technology img {
  height: 28px;
}

.technology-vue img {
  height: 22px;
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