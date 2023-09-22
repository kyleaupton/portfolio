<template>
  <div class="clickable-icon" :class="[{ 'clickable': clickable }]">
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
      },

      clickable: {
        type: Boolean,
        default: true,
      }
    },
  })
</script>

<style scoped>
.clickable-icon {
  background: var(--surface-min-20);
  display: grid;
  place-content: center;
  height: 3rem;
  width: 3rem;
  border-radius: 100%;
  transition: all .2s linear;
}

.clickable-icon.clickable {
  cursor: pointer;
}

.clickable-icon svg {
  height: 24px;
}

.clickable-icon:hover {
  border-radius: 8px;
}

.clickable.clickable-icon:active {
  background: var(--surface-min-30);
}

.clickable-icon svg {
  fill: var(--surface-plus-40);
}
</style>