<template>
  <div class="clickable-icon">
    <Icon :icon="icon" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Icon from './Icon.vue';

  export default defineComponent({
    name: 'ClickableIcon',

    components: {
      Icon
    },

    props: {
      icon: {
        type: String,
        required: true,
      }
    },
  })
</script>

<style scoped>
.clickable-icon {
  background: var(--surface-min-20);
  display: grid;
  place-content: center;
  height: 2rem;
  width: 2rem;
  border-radius: 100%;
  transition: all .2s linear;
}

.clickable-icon svg {
  height: 18px;
}

.clickable-icon:hover {
  border-radius: 8px;
}

.clickable-icon:active {
  background: var(--surface-min-30);
}
</style>