export const hasClass = (item: HTMLElement, classes: string[]): boolean => {
  for (const c of item.classList) {
    if (classes.includes(c)) {
      return true;
    }
  }

  if (item.parentElement) {
    return hasClass(item.parentElement, classes);
  }

  return false;
};
