// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  nitro: {
    // NOTE: we don't want to use the firebase preset because this is a static website and the firebase preset is for SSR
  },

  modules: ['nuxt-vuefire'],

  vuefire: {
    emulators: {
      enabled: false,
    },
    auth: true,

    appCheck: {
      provider: 'ReCaptchaV3',
      // site key, NOT secret key
      key: '6Ldmc3EnAAAAABDuQi-PGLBObXMOsVlXOntAX6WQ',
      isTokenAutoRefreshEnabled: true,
    },

    config: {
      apiKey: 'AIzaSyBKBqCHUpxMNjRJ8uhgOTK0wMGr9LkkFOA',
      authDomain: 'nuxt-vuefire-example-spark.firebaseapp.com',
      databaseURL:
        'https://nuxt-vuefire-example-spark-default-rtdb.europe-west1.firebasedatabase.app',
      projectId: 'nuxt-vuefire-example-spark',
      storageBucket: 'nuxt-vuefire-example-spark.appspot.com',
      messagingSenderId: '639475067598',
      appId: '1:639475067598:web:13fc8572370163aa913e9f',
    },
  },

  experimental: {
    payloadExtraction: false,
  },

  routeRules: {
    '/': { swr: true },
  },
})
