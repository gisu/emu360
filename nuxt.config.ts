// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  telemetry: false,
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@formkit/nuxt'
  ],
  runtimeConfig: {
    public: {
      // public runtime config
    }
  },
  vite: {
    logLevel: 'info'
  }
})
