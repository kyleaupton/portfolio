<template>
  <div class="technologies">
    <p>Technologies</p>

    <p>|</p>

    <template v-for="tech in techs" :key="tech.key">
      <ClickableIcon class="technology" :class="`technology-${tech.key}`" :icon="tech.icon" />
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
          }
        ]
      }
    },
  })
</script>

<style>
.technologies {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.technology {
  height: 3rem !important;
  width: 3rem !important;
}

.technology img {
  height: 28px;
}

.technology-vue img {
  height: 22px;
}
</style>