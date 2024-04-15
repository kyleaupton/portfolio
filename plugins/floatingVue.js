import floatingVue from "floating-vue";

export default defineNuxtPlugin((nuxtApp) => {
  floatingVue.options.themes.tooltip.delay.show = 300;
  floatingVue.options.themes.tooltip.delay.hide = 0;
  floatingVue.options.themes.tooltip.distance = 4;
});
