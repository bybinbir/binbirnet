
const ASSET_VERSION = '2';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: process.env.NODE_ENV !== 'production' },

  // srcDir: '.',

  experimental: {
    appManifest: false
  },

  // Hybrid Rendering: SSR + Prerender
  ssr: true,
  nitro: {
    publicAssets: [
      {
        baseURL: '/',
        dir: 'public'
      }
    ]
  },

  // Route Rules - Hybrid
  routeRules: {
    // SSR (dinamik veri iceren sayfalar)
    '/': { ssr: true },
    '/paketler': { ssr: true },
    '/kampanyalar': { ssr: true },
    '/basvuru': { ssr: true },
    '/altyapi-sorgula': { ssr: true },
    '/iletisim': { ssr: true },
    '/destek': { ssr: true },

    // Admin paneli - SSR
    '/admin/**': { ssr: true },

    // Prerender (statik sayfalar)
    '/hiz-testi': { prerender: true },
    '/kurumsal': { prerender: true },
    '/guvenli-internet': { prerender: true },
    '/yasal/**': { prerender: true },

    // Public API - stale-while-revalidate cache
    '/api/packages': { swr: 60 },
    '/api/slides': { swr: 60 },
    '/api/campaigns': { swr: 60 },
    '/api/settings': { swr: 300 },
    '/api/seo': { swr: 300 },
    '/api/tracking': { swr: 300 },
    '/api/navigation': { swr: 300 },
    '/api/homepage': { swr: 60 },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/turnstile',
  ],

  turnstile: {
    siteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY || '',
  },

  // Runtime Config (Environment Variables)
  runtimeConfig: {
    // Server-side only keys
    sessionSecret: process.env.NUXT_SESSION_SECRET || 'default-secret-change-in-production!',
    adminUser: process.env.NUXT_ADMIN_USER || 'admin',
    adminPasswordHash: process.env.NUXT_ADMIN_PASSWORD_HASH || '',
    smtpHost: process.env.NUXT_SMTP_HOST || 'm.wifitelekom.com',
    smtpPort: process.env.NUXT_SMTP_PORT || '587',
    smtpUser: process.env.NUXT_SMTP_USER || 'binbir-web@wifitelekom.com',
    smtpPass: process.env.NUXT_SMTP_PASS || 'Binbir1001',
    mailFrom: process.env.NUXT_MAIL_FROM || 'binbir-web@wifitelekom.com',
    mailFromName: process.env.NUXT_MAIL_FROM_NAME || 'BinbirNet Web',
    mailTo: process.env.NUXT_MAIL_TO || 'internet@binbirnet.com.tr',
    turnstile: {
      secretKey: process.env.NUXT_TURNSTILE_SECRET_KEY || '',
    },
    // Client-side keys
    public: {
      API_BASE: process.env.NUXT_PUBLIC_API_BASE || '/php-backend/',
      IL_KODU: '33',
      IL_ADI: 'Mersin'
    }
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'tr',
        class: 'scroll-smooth'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { property: 'og:locale', content: 'tr_TR' },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
        { rel: 'dns-prefetch', href: 'https://www.google.com' },
        { rel: 'dns-prefetch', href: 'https://www.gstatic.com' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL@20..48,100..700,0..1&display=swap' },
        { rel: 'icon', href: `/img/favicon.ico?v=${ASSET_VERSION}`, sizes: 'any' },
        { rel: 'icon', href: `/img/favicon-32x32.png?v=${ASSET_VERSION}`, type: 'image/png', sizes: '32x32' },
        { rel: 'icon', href: `/img/favicon-16x16.png?v=${ASSET_VERSION}`, type: 'image/png', sizes: '16x16' },
        { rel: 'apple-touch-icon', href: `/img/apple-touch-icon.png?v=${ASSET_VERSION}` },
        { rel: 'manifest', href: `/site.webmanifest?v=${ASSET_VERSION}` }
      ],
    }
  }
})
