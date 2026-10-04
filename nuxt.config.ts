export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxt/content', '@nuxt/eslint', 'nuxt-gtag'],

  devtools: { enabled: false },

  css: ['~/assets/css/main.css'],

  content: {
    experimental: {
      // node:sqlite (Node >= 22.5) avoids compiling better-sqlite3 in the image
      sqliteConnector: 'native',
    },
  },

  // Set at runtime via NUXT_GITHUB_TOKEN / NUXT_RESUME_URL. Reading process.env here
  // would bake the build machine's secrets into .output.
  runtimeConfig: {
    githubToken: '',
    resumeUrl: '',
    public: {
      siteUrl: 'https://kyleupton.dev',
    },
  },

  routeRules: {
    '/projects/flashit': { redirect: { to: '/flashit', statusCode: 301 } },
  },

  compatibilityDate: '2026-10-01',

  eslint: {
    config: {
      stylistic: true,
    },
  },

  gtag: {
    id: 'G-W1E8B7RHGN',
  },
})
