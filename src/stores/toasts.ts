import { defineStore } from 'pinia';
import { nanoid } from 'nanoid';

type t_type = 'normal' | 'error' | 'warning';

export type t_toast = {
  key: string;
  message: string;
  duration: number;
  type: t_type;
};

type state = {
  items: t_toast[];
};

export const useToastsStore = defineStore('toasts', {
  state: () =>
    ({
      items: [],
    }) as state,

  actions: {
    showToast({
      message,
      duration = 3, // In seconds!!
      type = 'normal',
    }: {
      message: string;
      duration?: number;
      type?: t_type;
    }) {
      const payload: t_toast = {
        key: nanoid(),
        message,
        duration,
        type,
      };

      this.items.push(payload);

      if (duration > -1) {
        window.setTimeout(() => {
          const index = this.items.findIndex((x) => x.key === payload.key);

          if (index > -1) {
            this.items.splice(index, 1);
          }
        }, duration * 1000);
      }
    },
  },
});
