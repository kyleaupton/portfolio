import { hasClass } from './class';

const keys: {
  [key: number]: number;
} = {
  32: 1, // Spacebar
  33: 1, // Page up
  43: 1, // Page down
  35: 1, // End
  36: 1, // Home
  37: 1, // Left
  38: 1, // Up
  39: 1, // Right
  40: 1, // Down
};

function preventDefault(e: Event) {
  const { target } = e;
  if (target && target instanceof HTMLElement && hasClass(target, ['modal'])) {
    return;
  }

  e.preventDefault();
}

function preventDefaultForScrollKeys(e: KeyboardEvent) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

export const disableScroll = () => {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener('wheel', preventDefault, { passive: false }); // desktop
  window.addEventListener('touchmove', preventDefault, { passive: false }); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
};

export const enableScroll = () => {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener('wheel', preventDefault);
  window.removeEventListener('touchmove', preventDefault);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
};
