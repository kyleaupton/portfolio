import { defineStore } from 'pinia';

type t_modal = {
  element: any;
};

type state = {
  item: t_modal | undefined;
};

export const useModalStore = defineStore('modal', {
  state: () =>
    ({
      item: undefined,
    }) as state,

  actions: {
    openModal() {},
  },
});
