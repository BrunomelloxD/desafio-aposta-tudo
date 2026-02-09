// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  devServer: {
    port: 8080
  },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt'
  ],

  dir: {
    pages: 'pages',
    layouts: 'layouts'
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3000'
    }
  },

  app: {
    head: {
      title: 'Sistema de Gestão',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
})
