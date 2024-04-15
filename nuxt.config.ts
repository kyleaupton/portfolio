// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: [
    "~/assets/css/main.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    transpile: ["@fortawesome/vue-fontawesome"],
  },
  modules: ["@nuxtjs/color-mode", "shadcn-nuxt", "floating-vue/nuxt"],
  colorMode: {
    preference: "dark",
    fallback: "dark",
    classSuffix: "",
  },
});
