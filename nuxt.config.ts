// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxthq/ui'
  ],

  build: {
    transpile: [
      'vcard-creator'
    ]
  },

  routeRules: {
    '/': {
      prerender: true
    }
  }
})
