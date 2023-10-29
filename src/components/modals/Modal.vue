<template>
  <transition name="slide">
    <div v-if="comp" class="modal">
      <div class="modal-titlebar">
        <div
          v-if="_item.titlebarIcons && _item.titlebarIcons.length"
          class="modal-titlebar-extra-icons"
        >
          <ClickableIcon
            v-for="icon of _item.titlebarIcons"
            :key="icon.icon[0]"
            v-tooltip="{ content: icon.tooltip, delay: 500 }"
            :link="icon.link || ''"
          >
            <fa-icon
              :icon="icon.icon"
              size="xl"
              style="color: var(--surface-0)"
            />
          </ClickableIcon>
        </div>

        <ClickableIcon @click="handleRemove">
          <fa-icon
            :icon="['fas', 'xmark']"
            size="xl"
            style="color: var(--surface-0)"
          />
        </ClickableIcon>
      </div>

      <component :is="comp" />
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'pinia';

import { useModalStore } from '@/stores/modal';

import ClickableIcon from '@/components/icons/ClickableIcon.vue';
import ModalReadMe from '@/components/modals/ModalReadMe.vue';

export default defineComponent({
  name: 'Modal',

  components: {
    ClickableIcon,
  },

  computed: {
    ...mapState(useModalStore, ['item']),

    _item() {
      if (!this.item) {
        throw Error('No item');
      }

      return this.item;
    },

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

  created() {
    document.addEventListener('keydown', this.keydownHandler);
  },

  beforeUnmount() {
    document.removeEventListener('keydown', this.keydownHandler);
  },

  methods: {
    ...mapActions(useModalStore, ['closeModal']),

    handleRemove() {
      this.closeModal();
    },

    keydownHandler(event: KeyboardEvent) {
      if (this.item && event.key === 'Escape') {
        this.handleRemove();
      }
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
  justify-content: space-between;
  padding: 12px;
  box-sizing: border-box;
}

.modal-titlebar-extra-icons {
  display: flex;
  gap: 4px;
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
