<template>
  <component :is="component" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GitHub from './GitHub.vue';
import LinkedIn from './LinkedIn.vue';

  export default defineComponent({
    name: 'Icon',

    components: {
      GitHub,
    },

    props: {
      icon: {
        type: String,
        required: true,
      }
    },

    computed: {
      component() {
        if (this.icon === 'github') {
          return GitHub
        } else if (this.icon === 'linkedin') {
          return LinkedIn
        }

        throw Error()
      }
    }
  })
</script>

<style lang="scss" scoped>

</style>