import { defineStore } from 'pinia';
import { ModalReadMe } from '../components/modals/ModalReadMe.vue';

export type t_modal = ModalReadMe;

type state = {
  item: t_modal | undefined;
};

export const useModalStore = defineStore('modal', {
  state: () =>
    ({
      item: undefined,
    }) as state,

  actions: {
    openModal(modal: t_modal) {
      this.item = modal;
    },

    closeModal() {
      this.item = undefined;
    },
  },
});
