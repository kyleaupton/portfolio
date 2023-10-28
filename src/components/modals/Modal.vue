<template>
  <transition name="slide">
    <div v-if="comp" class="modal">
      <div class="modal-titlebar">
        <div class="modal-titlebar-close-wrapper" @click="handleRemove">
          <fa-icon
            class="modal-titlebar-close"
            :icon="['fas', 'xmark']"
            size="xl"
          />
        </div>
      </div>

      <component :is="comp" />
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'pinia';
import { useModalStore } from '../../stores/modal';

import ModalReadMe from './ModalReadMe.vue';

export default defineComponent({
  name: 'Modal',

  computed: {
    ...mapState(useModalStore, ['item']),

    comp() {
      if (this.item) {
        switch (this.item.name) {
          case 'ModalReadMe':
            return ModalReadMe;
          default:
            throw Error('Invalid Modal');
        }
      }

      return undefined;
    },
  },

  methods: {
    ...mapActions(useModalStore, ['closeModal']),

    handleRemove() {
      this.closeModal();
    },
  },
});
</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.75);
}

.modal {
  z-index: 9000;
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  height: 90%;
  width: 100%;

  display: flex;
  flex-direction: column;

  max-width: 80%;
  max-width: min(1000px, 80%);

  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: var(--surface-0);
}

@media only screen and (max-width: 600px) {
  .modal {
    max-width: 100%;
  }
}

.modal-titlebar {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 12px;
  box-sizing: border-box;
}

.modal-titlebar-close-wrapper {
  padding: 4px;
  background: var(--surface-min-20);
  border-radius: 100%;
  display: grid;
  place-content: center;
  height: 24px;
  width: 24px;
}

.modal-titlebar-close-wrapper:hover {
  background-color: var(--surface-min-30);
}

.modal-titlebar-close-wrapper:active {
  background-color: var(--surface-min-40);
}

.modal-titlebar-close {
  border-radius: 100%;
  color: var(--surface-0);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-in-out;
}

/* .slide-enter-active {
  animation: bounce-in 0.3s;
}

.slide-leave-active {
  animation: bounce-in 0.3s reverse;
} */

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translate(-50%, 50%) scale(0.5);
}

/* @keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
} */
</style>
