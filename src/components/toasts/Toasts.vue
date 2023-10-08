<template>
  <TransitionGroup name="toasts-group" tag="div" class="toasts">
    <Toast v-for="toast of items" :key="toast.key" :toast="toast" />
  </TransitionGroup>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'pinia';
import { useToastsStore } from '../../stores/toasts';
import Toast from './Toast.vue';

export default defineComponent({
  name: 'Toasts',

  components: {
    Toast,
  },

  computed: {
    ...mapState(useToastsStore, ['items']),
  },
});
</script>

<style scoped>
.toasts {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  pointer-events: none;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  padding: 2rem 0;
  box-sizing: border-box;
}

.toasts-group-enter-active,
.toasts-group-leave-active {
  transition: all 0.2s ease;
}

.toasts-group-enter-from,
.toasts-group-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
