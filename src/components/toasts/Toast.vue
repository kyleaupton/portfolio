<template>
  <div
    class="toast"
    :class="[
      { 'toast-normal': toast.type === 'normal' },
      { 'toast-warning': toast.type === 'warning' },
      { 'toast-error': toast.type === 'error' },
    ]"
  >
    <Icon class="toast-icon" icon="check" />

    <div>{{ toast.message }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Icon from '../icons/Icon.vue';
import { t_toast } from '../../stores/toasts';

export default defineComponent({
  name: 'Toast',

  components: {
    Icon,
  },

  props: {
    toast: {
      type: Object as PropType<t_toast>,
      required: true,
    },
  },
});
</script>

<style scoped>
.toast {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 600;
}

.toast-normal {
  background: #4bb543;
  color: var(--text1);
}

svg.toast-icon {
  fill: var(--text1);
}
</style>
