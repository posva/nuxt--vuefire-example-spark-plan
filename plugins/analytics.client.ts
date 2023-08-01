import { Analytics, initializeAnalytics, isSupported } from 'firebase/analytics'

export default defineNuxtPlugin(async () => {
  const firebaseApp = useFirebaseApp()

  console.log('Loading analytics')

  let analytics: Analytics | null = null
  if (await isSupported()) {
    analytics = initializeAnalytics(firebaseApp)
    console.log('Loaded analytics')
  } else {
    console.log('Analytics not supported')
  }

  return {
    provide: {
      analytics,
    },
  }
})
