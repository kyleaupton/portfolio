<template>
  <div
    class="toast"
    :class="[
      { 'toast-normal': toast.type === 'normal' },
      { 'toast-warning': toast.type === 'warning' },
      { 'toast-error': toast.type === 'error' },
    ]"
  >
    <Icon class="toast-icon" :icon="icon" />

    <div class="toast-text-container">
      <div>{{ toast.message }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { t_toast } from '@/stores/toasts';
import Icon from '@/components/icons/Icon.vue';

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

  computed: {
    icon() {
      if (this.toast.type === 'normal') return 'check';
      else if (this.toast.type === 'error') return 'xmark';

      throw Error('No Icon for toast type');
    },
  },
});
</script>

<style scoped>
.toast {
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  min-width: 250px;
  box-sizing: border-box;
}

.toast-text-container {
  flex-grow: 2;
  /* text-align: center; */
}

.toast-normal {
  background: #4bb543;
  color: var(--text1);
}

.toast-error {
  background: #e34f4f;
  color: var(--text1);
}

svg.toast-icon {
  fill: var(--text1);
}
</style>
