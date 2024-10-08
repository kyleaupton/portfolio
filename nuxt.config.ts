// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  css: [
    '~/assets/css/main.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  build: {
    transpile: ['@fortawesome/vue-fontawesome'],
  },

  modules: [
    '@nuxtjs/color-mode',
    'shadcn-nuxt',
    'floating-vue/nuxt',
    'nuxt-gtag',
    '@nuxt/eslint',
  ],

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: '',
  },

  // @ts-ignore
  gtag: {
    id: 'G-W1E8B7RHGN',
  },

  compatibilityDate: '2024-09-02',
})
