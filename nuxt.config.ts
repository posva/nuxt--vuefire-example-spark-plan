// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  nitro: {
    // TODO: once the new preset is published
    preset: 'firebase',
  },

  modules: ['nuxt-vuefire'],

  vuefire: {
    emulators: {
      enabled: false,
    },
    auth: true,
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
})
