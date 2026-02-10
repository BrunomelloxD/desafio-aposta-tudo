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
      title: 'APOSTATUDO - Sistema de Gestão',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        /**
         * Google Fonts - Plus Jakarta Sans
         * 
         * Tech Lead Decision:
         * - Preconnect otimiza DNS lookup (~100ms improvement)
         * - display=swap evita FOIT (Flash of Invisible Text)
         * - Weights 300-800 cobrem todos os casos de uso do design
         * - CDN do Google oferece cache global e alta disponibilidade
         * 
         * @see /FONTS.md para documentação completa
         */
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap'
        }
      ]
    }
  }
})
